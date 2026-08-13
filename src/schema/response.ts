import type { CODE } from '@/common/code.ts'

export interface Response<T = any> {
  code: (typeof CODE)[keyof typeof CODE]
  message: string
  data: T
}
