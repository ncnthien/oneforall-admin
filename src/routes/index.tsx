import { AxiosSetupInterceptors } from 'apis/axiosClient'
import {
  Event,
  Login,
  Order,
  Product,
  Profile,
  Statistic,
  User,
} from 'features'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from='/' to='/login' />
        <Route path='/event' component={() => <Event />} />
        <Route path='/bill' component={() => <Order />} />
        <Route path='/tour' component={() => <Product />} />
        <Route path='/profile' component={() => <Profile />} />
        <Route path='/statistic' component={() => <Statistic />} />
        <Route path='/user' component={() => <User />} />
        <Route path='/login' component={() => <Login />} />
      </Switch>
      <AxiosSetupInterceptors />
    </BrowserRouter>
  )
}

export default Routes
