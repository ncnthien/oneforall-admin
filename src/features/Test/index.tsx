import { Switch, useRouteMatch } from 'react-router-dom'
import PrivateRoute from 'routes/PrivateRoute'
import MainLayout from 'layouts/MainLayout/MainLayout'
import Main from 'features/Test/pages/Main/Main'

const Test: React.FC = () => {
  const match = useRouteMatch()

  return (
    <Switch>
      <PrivateRoute
        path={match.url}
        exact={true}
        component={() => <Main text='Hello, I am test route <3' />}
        layout={MainLayout}
      ></PrivateRoute>
    </Switch>
  )
}

export default Test
