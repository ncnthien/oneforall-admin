import { BrandTableProps } from 'features/Brand/interface'
import { ReadMore } from 'features/Brand/components'
import { Link } from 'react-router-dom'

const BrandTable: React.FC<BrandTableProps> = ({ brands }) => {
  const seeMoreText = 'See more'
  const seeLessText = 'See less'

  const renderTableData = (): JSX.Element[] => {
    return brands.map(brand => (
      <tr key={brand._id} className='text-center border-b-2 min-w-max'>
        <td className='w-2/12'>
          <img src={brand.logo} alt={brand.name} className='w-20 inline py-1' />
        </td>
        <td className='w-2/12 py-1'>{brand.name}</td>
        <td className='w-6/12 text-left py-1'>
          <ReadMore more={seeMoreText} less={seeLessText} lines={1}>
            {brand.summary}
          </ReadMore>
        </td>
        <td className='w-2/12 py-1'>
          <Link
            to='/brand'
            className='bg-cyan-400 text-white rounded py-2 px-3 inline-block mr-2 text-sm hover:bg-cyan-500 transition-all'
          >
            Update
          </Link>
          <button className='bg-red-400 text-white rounded py-2 px-3 inline-block text-sm hover:bg-red-500 transition-all'>
            Remove
          </button>
        </td>
      </tr>
    ))
  }

  return (
    <table className='bg-white rounded-lg shadow-lg px-3 w-full'>
      <thead className='border-b-2 min-w-max'>
        <tr>
          <th className='py-4'>Logo</th>
          <th className='py-4'>Name</th>
          <th className='py-4'>Summary</th>
          <th className='py-4'>Actions</th>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  )
}

export default BrandTable
