import React from 'react'
import Axios from '../../../utils/Axios'
import SummaryAPI from '../../../common/SummaryAPI'
import AxiosToastError from '../../../utils/AxiosToastError'
import { useState } from 'react'
import { useEffect } from 'react'
import Loader from '../Loader/Loader.jsx'
import ProductCardAdmin from '../ProductCardAdmin/ProductCardAdmin.jsx'
import { IoSearch } from "react-icons/io5";

const ProductAdmin = () => {

  const [ productData, setProductData ] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search,setSearch] = useState("")

    const fetchProductData = async () =>{
        try {
          setLoading(true)
            const res = await Axios({
                ...SummaryAPI.getProduct,
                data : {
                    page : page,
                    limit : 12,
                    search : search
                }
            })

            const { data : responseData } = res
            if( responseData.success){
                setProductData(responseData.data)
            }

        } catch (error) {
            AxiosToastError(error)
        }finally{
          setLoading(false)
        }
    }

    useEffect(()=>{
        fetchProductData()
    },[page])

    const handlePrevious = ()=>{
      if(page > 1){
        setPage(prev => prev + 1)
    }
  }
    const handleNext = ()=>{
      if(page !== totalPageCount){
        setPage(prev => prev - 1)
    }
    }
    const handleOnChange = (e)=>{
      const { value } = e.target
      setSearch(value)
      setPage(1)
    }

    useEffect(() => {
    let flag = true

    const interval = setTimeout(() =>{

      if(flag){
        fetchProductData()
        flag = false
      }
    },300)
    fetchProductData()

    return ()=>{
      clearTimeout(interval)
    }
  },[search])
    

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex justify-between items-center gap-4">
        <h2 className="font-semibold">Product</h2>
        <div className="h-full w-full max-w-56 ml-auto min-w-24 bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border hover:border-amber-300">
          <IoSearch size={20}/>
          <input 
          type="text"
          placeholder='Search product here...'
          className='h-full w-full outline-none bg-transparent'
          value={search}
          onChange={handleOnChange}
          />
        </div>
      </div>
    {
      loading && (
        <Loader/>
      )
    }
    <div className="p-4 bg-blue-50">
      <div className="min-h-[50vh]">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
    {
      productData.map((p,index)=>{
        return(
          <ProductCardAdmin data={p} />
        )
      })
    }
    </div>
      </div>
    <div className="flex justify-between my-2">
      <button onClick={handlePrevious} className="border-2 border-amber-300 px-4 py-1 hover:bg-amber-400" >Previous</button>
      <button>{page}/{totalPageCount}</button>
      <button onClick={handleNext} className="border-2 border-amber-300 px-4 py-1 hover:bg-amber-400" >Next</button>
    </div>
    </div>

      </section>
  )
}

export default ProductAdmin
