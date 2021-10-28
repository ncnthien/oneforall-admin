import Routes from 'routes'
import { AxiosSetupInterceptors } from 'apis/axiosClient'

const App: React.FC = () => {
  return (
    <div className='App'>
      <Routes />
      <AxiosSetupInterceptors />
    </div>
  )
}

export default App
