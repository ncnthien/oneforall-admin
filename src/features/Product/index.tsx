import { Main, ProductAdd, ProductDetail } from 'features/Product/pages'
import MainLayout from 'layouts/MainLayout/MainLayout'
import { Switch, useRouteMatch } from 'react-router-dom'
import PrivateRoute from 'routes/PrivateRoute'

const Product: React.FC = () => {
  const match = useRouteMatch()

  return (
    <Switch>
      <PrivateRoute
        path={match.url}
        exact={true}
        component={() => <Main />}
        layout={MainLayout}
      />
      <PrivateRoute
        path={`${match.url}/add`}
        exact={true}
        component={() => <ProductAdd />}
        layout={MainLayout}
      />
      <PrivateRoute
        path={`${match.url}/:productId`}
        exact={true}
        component={() => <ProductDetail />}
        layout={MainLayout}
      />
    </Switch>
  )
}

export default Product
