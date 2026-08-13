import type { AxiosRequestConfig } from 'axios'

export type RequestArgs = [config: AxiosRequestConfig] | [url: string, config?: AxiosRequestConfig]
