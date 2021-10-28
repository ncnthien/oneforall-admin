import { useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import { IRoute } from './interface'

const PrivateRoute: React.FC<IRoute> = ({
  path,
  exact,
  component: Component,
  layout: Layout,
}) => {
  const history = useHistory()

  // authentication
  useEffect(() => {
    const jwtTokenKey = 'jwtToken'
    const token = localStorage.getItem(jwtTokenKey)

    if (!token) {
      history.push('/login')
    }
  }, [])

  return (
    <Route path={path} exact={exact}>
      <Layout>
        <Component />
      </Layout>
    </Route>
  )
}

export default PrivateRoute
