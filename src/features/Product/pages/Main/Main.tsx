import productApi from 'apis/productApi'
import { ProductTable } from 'features/Product/components'
import { Product, SelectedItem } from 'features/Product/interface'
import 'features/Product/pages/Main/Main.css'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { swal, getClone } from 'helper'

const LIMIT = 10

const Main: React.FC = () => {
  const [totalItem, setTotalItem] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const {
        data: {
          data: products,
          pagination: { total: totalItem },
        },
      } = await productApi.getAll({ page: pageNumber, limit: LIMIT })
      setProducts(products)
      setTotalItem(totalItem)
      window.scrollTo(0, 0)
    }

    fetchProducts()
  }, [pageNumber, totalItem])

  const handlePageChange = ({ selected }: SelectedItem) => {
    const newPageNumber = selected + 1
    setPageNumber(newPageNumber)
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      const okStatus = 200
      const { status } = await productApi.delete(productId)
      if (status === okStatus) {
        swal.fire('Deleted!', `Delete product successfully`, 'success')
        const clonedProducts = getClone(products)
        const newProducts = clonedProducts.filter(
          product => product._id !== productId
        )
        setProducts(newProducts)
      }
    } catch (error) {
      swal.fire('Opps!', `Delete product failed, please try again!`, 'error')
    }
  }

  return (
    <div>
      <div className='flex justify-end mb-8'>
        <Link
          to='/tour/add'
          className='bg-green-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition-all'
        >
          Thêm tour mới
        </Link>
      </div>
      <ProductTable products={products} deleteProduct={handleDeleteProduct} />
      <div className='pt-8'>
        <ReactPaginate
          pageCount={Math.ceil(totalItem / 24)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName='pagination'
          previousLabel='Trước'
          nextLabel='Sau'
        />
      </div>
    </div>
  )
}

export default Main
