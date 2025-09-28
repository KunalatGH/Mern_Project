import React, { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import CardProduct from '../CardProduct/CardProduct'
import AxiosToastError from '../../../utils/AxiosToastError'
import SummaryAPI from '../../../common/SummaryAPI'
import Axios from '../../../utils/Axios'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../../../../../server/utils/valideURLConvert'
// const ProductListPage = () => {
//   const params = useParams()

//   console.log(params);
  
//   return (
//     <section className="sticky top-24 lg:top-24">
//       <div className="container top-24 mx-auto grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4"> 
//         {/* Sidebar */}
//         <aside className="col-span-1 bg-red-500 min-h-[79vh]">
//           <h2 className="font-bold text-lg mb-6">Sub Category</h2>
//         </aside>
//         {/* Main Content */}
//         <main className="col-span-3 bg-green-600 p-8 h-full">
//           <h2 className="text-white text-2xl font-bold mb-6">Product</h2>
//         </main>
//       </div>
//     </section>
//   );
// };


const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])

  
  const subCategory = params?.subcategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")
  
  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subcategory.split("-").slice(-1)[0]
  
  
  // console.log(params?.subcategory);
  // console.log("subCategory",subCategory);
  // console.log("subCategoryName",subCategoryName);
  
  console.log("AllSubCategory",AllSubCategory)
  
  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryAPI.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
        // console.log("Fetched products:", responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductdata()
  }, [params])


  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
    <section className='sticky top-24 lg:top-20 '>
      <div className='container sticky top-24  mx-auto grid grid-cols-3 md:grid-cols-4  lg:grid-cols-4'>
        {/**sub category **/}
        <div className=' min-h-[88vh] border overflow-scroll max-h-[88vh]  flex-col gap-1 shadow-md  py-2'>
          {
            DisplaySubCatory.map((s, index) => {
               const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`               
              return (
                <Link
                key={index}
                to={link} className={`w-full p-2 lg:flex items-center lg:w-full lg:h-30 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
                >
                  <div className='w-fit  max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border' >
                    <img
                      src={s.image}
                      alt='subCategory'
                      className=' w-14 lg:h-14 lg:w-20 h-full object-scale-down'
                    />
                  </div>
                  <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
                </Link>
              )
            })
          }
        </div>


        {/**Product **/}
        <div className='sticky top-20 w-70 sm:w-120 lg:w-280 '>
          <div className='bg-white shadow-md p-4 '>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>

           <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto  relative w-full'>
            <div className=' grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 p-4 gap-4 '>
                {
                  data.map((p, index) => {
                    return (
                      <CardProduct
                        data={p}
                        key={p._id + "productSubCategory" + index}
                      />
                    )
                  })
                }
              </div>
           </div>

           


            {
              loading && (
                <LoaderIcon />
              )
            }

          </div>
        </div>
      </div>
    </section>
  )
}
export default ProductListPage