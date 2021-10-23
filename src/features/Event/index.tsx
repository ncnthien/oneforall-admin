import { Main, AddEvent, DetailEvent } from 'features/Event/pages'
import MainLayout from 'layouts/MainLayout/MainLayout'
import { Switch, useRouteMatch } from 'react-router-dom'
import PrivateRoute from 'routes/PrivateRoute'

const Event: React.FC = () => {
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
        component={() => <AddEvent />}
        layout={MainLayout}
      />
      <PrivateRoute
        path={`${match.url}/:eventId`}
        exact={true}
        component={() => <DetailEvent />}
        layout={MainLayout}
      />
    </Switch>
  )
}

export default Event
