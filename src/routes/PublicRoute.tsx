import { Route } from 'react-router-dom'
import { IRoute } from './interface'

const PublicRoute: React.FC<IRoute> = ({
  path,
  exact,
  component: Component,
  layout: Layout,
}) => {
  return (
    <Route path={path} exact={exact}>
      <Layout>
        <Component />
      </Layout>
    </Route>
  )
}

export default PublicRoute
