import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Test from 'features/Test/index'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/test' component={() => <Test />} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
