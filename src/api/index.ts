import axios from 'axios'

import { isEmpty } from '@/utils'
import { getStorge } from '@/utils/storge.ts'

const whiteList = new Set(['/login', '/register'])

export function createInstance() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
  })

  const token = getStorge('token')
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
