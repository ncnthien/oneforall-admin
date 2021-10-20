import { Main, DetailBrand, AddBrand } from 'features/Brand/pages'
import MainLayout from 'layouts/MainLayout/MainLayout'
import { Switch, useRouteMatch } from 'react-router-dom'
import PrivateRoute from 'routes/PrivateRoute'

const Brand: React.FC = () => {
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
        component={() => <AddBrand />}
        layout={MainLayout}
      />
      <PrivateRoute
        path={`${match.url}/:detailBrand`}
        exact={true}
        component={() => <DetailBrand />}
        layout={MainLayout}
      />
    </Switch>
  )
}

export default Brand
