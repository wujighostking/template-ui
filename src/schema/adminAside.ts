export interface MenuItem {
  componentPath: string
  menuName: string
  icon: string
  children?: MenuItem[]
}
