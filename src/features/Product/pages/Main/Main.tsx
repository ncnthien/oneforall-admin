import productApi from 'apis/productApi'
import { ProductTable } from 'features/Product/components'
import { Product, SelectedItem } from 'features/Product/interface'
import 'features/Product/pages/Main/Main.css'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

const Main: React.FC = () => {
  const [totalItem, setTotalItem] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const {
        data: { productList: products, total: totalItem },
      } = await productApi.getAll(pageNumber)
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

  return (
    <div className='transit'>
      <div className='flex justify-end mb-8'>
        <Link
          to='/product/add'
          className='bg-green-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-500 transition-all'
        >
          New product
        </Link>
      </div>
      <ProductTable products={products} />
      <div className='pt-8'>
        <ReactPaginate
          pageCount={Math.ceil(totalItem / 24)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName='pagination'
          previousLabel='prev'
          nextLabel='next'
        />
      </div>
    </div>
  )
}

export default Main
