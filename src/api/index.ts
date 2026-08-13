import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

import { CODE } from '@/common/code.ts'
import { whiteList } from '@/common/constants.ts'
import type { Response } from '@/schema/response.ts'
import { isEmpty } from '@/utils'
import { getStorage } from '@/utils/storage'

export function createInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
  })

  const token = getStorage('token')

  if (isEmpty(token) && !whiteList.has(new URL(window.location.href).pathname)) {
    if (__DEV__) {
      console.error('Token is empty, redirecting to login page')
    }

    window.location.href = '/login'

    return instance
  }

  instance.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${token}`
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
        return response
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
function request(...args: Parameters<typeof _request>): Promise<Response> {
  return _request(...args).then(
    (response) => response.data,
    (error) => Promise.reject(error),
  )
}
export { request as default, request }
