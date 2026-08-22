export interface MenuItem {
  id: string
  path: string
  name?: string
  menuName: string
  icon?: string
  meta?: object
  children?: MenuItem[]
}
