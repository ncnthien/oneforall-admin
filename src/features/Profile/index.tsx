import Main from 'features/Profile/pages/Main/Main'
import MainLayout from 'layouts/MainLayout/MainLayout'
import { Switch, useRouteMatch } from 'react-router-dom'
import PrivateRoute from 'routes/PrivateRoute'

const Profile: React.FC = () => {
  const match = useRouteMatch()

  return (
    <Switch>
      <PrivateRoute
        path={match.url}
        exact={true}
        component={() => <Main />}
        layout={MainLayout}
      ></PrivateRoute>
    </Switch>
  )
}

export default Profile
