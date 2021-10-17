import {
  Brand,
  Event,
  Order,
  Product,
  Profile,
  Statistic,
  User,
} from 'features'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/brand' component={() => <Brand />} />
        <Route path='/event' component={() => <Event />} />
        <Route path='/order' component={() => <Order />} />
        <Route path='/product' component={() => <Product />} />
        <Route path='/profile' component={() => <Profile />} />
        <Route path='/statistic' component={() => <Statistic />} />
        <Route path='/user' component={() => <User />} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
