import { AxiosSetupInterceptors } from 'apis/axiosClient'
import {
  Brand,
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
        <Route path='/brand' component={() => <Brand />} />
        <Route path='/event' component={() => <Event />} />
        <Route path='/order' component={() => <Order />} />
        <Route path='/product' component={() => <Product />} />
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
