export interface IRoute {
  path: string
  exact: boolean
  component: React.ElementType
  layout: React.ElementType
}
