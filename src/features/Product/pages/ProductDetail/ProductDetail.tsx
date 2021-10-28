import { useLocation } from 'react-router-dom'
import { LocationState } from 'features/Product/interface'

const ProductDetail: React.FC = () => {
  const { state } = useLocation<LocationState>()

  return <div>{state._id}</div>
}

export default ProductDetail
