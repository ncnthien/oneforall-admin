import { Main } from 'features/Login/pages'
import BlankLayout from 'layouts/BlankLayout/BlankLayout'
import { Switch, useRouteMatch } from 'react-router-dom'
import PublicRoute from 'routes/PublicRoute'

const Login: React.FC = () => {
  const match = useRouteMatch()

  return (
    <Switch>
      <PublicRoute
        path={match.url}
        exact={true}
        component={() => <Main />}
        layout={BlankLayout}
      ></PublicRoute>
    </Switch>
  )
}

export default Login
