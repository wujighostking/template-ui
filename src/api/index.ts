import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'

import { CODE } from '@/common/code.ts'
import { whiteList } from '@/common/constants.ts'
import type { RequestArgs } from '@/schema/request.ts'
import type { Response } from '@/schema/response.ts'
import { isEmpty } from '@/utils'
import { getToken } from '@/utils/storage'
import { isBoolean, isString } from '@/utils/types.ts'

export function createInstance(): AxiosInstance {
  const instance = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
  })

  if (isEmpty(getToken()) && !whiteList.has(new URL(window.location.href).pathname)) {
    if (__DEV__) {
      console.error('Token is empty, redirecting to login page')
    }

    window.location.href = '/login'

    return instance
  }

  instance.interceptors.request.use(
    (config) => {
      const url = config.url
      if (url && !url.startsWith('/api')) {
        if (!url.startsWith('/')) {
          config.url = `/${url}`
        }
        config.url = `/api${config.url}`
      }

      config.headers['Authorization'] = `Bearer ${getToken()}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    (response: AxiosResponse<Response>) => {
      const data = response.data
      if (data?.code === CODE.UNAUTHORIZED) {
        window.location.href = '/login'
      } else if (data?.code !== CODE.SUCCESS && data?.message) {
        ElMessage.error(data.message)
      }

      return response
    },
    (error) => {
      // You can handle errors here
      return Promise.reject(error)
    },
  )

  return instance
}

const _request = createInstance()

/** 请求缓存，key 由 url 与请求参数拼接而成 */
const cache = new Map<string, Promise<Response>>()

/** 参数归一化：将 (url, config?) 或 (config) 归一化为统一的 config 字符串 */
function normalizeConfig(...args: Parameters<typeof _request>): string {
  const [configOrUrl, maybeConfig] = args
  const config: AxiosRequestConfig = isString(configOrUrl)
    ? { ...maybeConfig, url: configOrUrl }
    : configOrUrl
  return JSON.stringify(config)
}

function request(config: AxiosRequestConfig, isCache?: boolean): Promise<Response>
function request(url: string, config?: AxiosRequestConfig, isCache?: boolean): Promise<Response>

function request(...args: [...RequestArgs, isCache?: boolean]): Promise<Response> {
  const last = args.at(-1)
  const isCache = isBoolean(last) ? last : true
  const requestArgs = (isBoolean(last) ? args.slice(0, -1) : args) as Parameters<typeof _request>

  const key = normalizeConfig(...requestArgs)

  if (isCache && cache.has(key)) {
    return cache.get(key)!
  }

  const promise = _request(...requestArgs)
    .then((response) => response.data)
    .catch((error) => {
      if (__DEV__) {
        console.error(error)
      }

      return Promise.reject(error)
    })
    .finally(() => isCache && cache.delete(key))

  if (isCache) {
    cache.set(key, promise)
  }

  return promise
}
export { request as default, request }
