import { BrandTableProps } from 'features/Brand/interface'
import { ReadMore } from 'features/Brand/components'
import { Link } from 'react-router-dom'
import { swal } from 'helper'

const BrandTable: React.FC<BrandTableProps> = ({ brands, deleteBrand }) => {
  const seeMoreText = 'See more'
  const seeLessText = 'See less'

  const handleRemoveButtonClick =
    (brandId: string, brandName: string) => () => {
      swal
        .fire({
          title: `Are you sure to delete brand ${brandName}`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
        })
        .then(async result => {
          if (result.isConfirmed) {
            deleteBrand(brandId, brandName)
          }
        })
    }

  const renderTableData = (): JSX.Element[] => {
    return brands.map(({ _id, logo, name, summary, value }) => (
      <tr key={_id} className='text-center border-b-2 min-w-max'>
        <td className='w-2/12 py-2'>
          <img src={logo} alt={name} className='w-20 inline' />
        </td>
        <td className='w-2/12 py-2'>{name}</td>
        <td className='w-6/12 text-left py-2'>
          <ReadMore more={seeMoreText} less={seeLessText} lines={1}>
            {summary}
          </ReadMore>
        </td>
        <td className='w-2/12 py-2'>
          <Link
            to={{
              pathname: `/brand/${value}`,
              state: { _id },
            }}
            className='bg-cyan-400 text-white rounded py-2 px-3 inline-block mr-2 text-sm hover:bg-cyan-500 transition-all'
          >
            Detail
          </Link>
          <button
            onClick={handleRemoveButtonClick(_id, name)}
            className='bg-red-400 text-white rounded py-2 px-3 inline-block text-sm hover:bg-red-500 transition-all'
          >
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
