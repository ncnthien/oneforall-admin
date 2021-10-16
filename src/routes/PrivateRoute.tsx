import { Route } from 'react-router-dom'
import { IRoute } from './interface'

const PrivateRoute: React.FC<IRoute> = ({
  path,
  exact,
  component: Component,
  layout: Layout,
}) => {
  // authentication

  return (
    <Route path={path} exact={exact}>
      <Layout>
        <Component />
      </Layout>
    </Route>
  )
}

export default PrivateRoute
