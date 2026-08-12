import axios from 'axios'

import { whiteList } from '@/common/constants.ts'
import { isEmpty } from '@/utils'
import { getStorage } from '@/utils/storage'

export function createInstance() {
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
    (response) => {
      // You can handle the response data here
      return response.data
    },
    (error) => {
      // You can handle errors here
      return Promise.reject(error)
    },
  )

  return instance
}

const request = createInstance()
export { request as default, request }
