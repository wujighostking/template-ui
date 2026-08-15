// import router from './'
import { getMenu } from '@/api/menu.ts'

export function addRoutes() {
  return getMenu().then((res) => {
    return res
  })
}
