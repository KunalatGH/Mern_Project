import  { useEffect, useState } from 'react'

import UploadSubCategoryModel from '../UploadSubCategoryModel/UploadSubCategoryModel'
import Axios from '../../../utils/Axios'
import SummaryAPI from '../../../common/SummaryAPI'
import AxiosToastError from '../../../utils/AxiosToastError'
import DisplayTable from '../DisplayTable/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../ViewImage/ViewImage'
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import EditSubCategory from '../EditSubCategory/EditSubCategory'
import ConfirmBox from '../ConfirmBox/ConfirmBox'
import toast from 'react-hot-toast'

const SubCategory = () => {
  const [openAddSubCategory,setopenAddSubCategory] = useState(false)
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [ImageURL,setImageURL] = useState("")
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({
    id: ""
  })
  const [deleteSubCategory,setDeleteSubCategory] = useState({
    _id: ""
  })
  const [openDeleteConfirmBox,setOpenDeleteConfirmBox] = useState(false)

  const fetchSubCategory = async()=>{
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryAPI.getSubCategory
      })
      const { data : responseData } = res

      if(responseData.success){
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchSubCategory()
  },[])

  const column = [
    columnHelper.accessor('name',{
      header: 'Name'
    }),
    columnHelper.accessor('image',{
      header: 'Image',
      cell : ({row})=>{
        console.log("Row",row.original.image);
        return <div className="flex items-center justify-center">
          <img 
          src={row.original.image}
          alt={row.original.name}
          className='w-15 h-15 p-1 cursor-pointer' 
          onClick={()=>{
            setImageURL(row.original.image)
          }}
          />
          </div>
      }
    }),
    columnHelper.accessor('category',{
      header: 'Category',
      cell : ({row})=>{
        return(
          <>
          {
            row.original.category.map((c,index)=>{
              return(
                <p key={c._id+"table"} 
                className='shadow-md px-1 inline-block'>{c.name}</p>
              )
            })
          } 
          </>
        )
      }
      }),
      columnHelper.accessor('_id',{
        header: 'Action',
        cell : ({row})=>{
          return(
            <div className="flex items-center justify-center gap-3">
              <button onClick={()=>{
                setOpenEdit(true)
                setEditData(row.original)
              }} className='p-2 bg-green-100 rounded-full hover:text-green-700'>
              <BiPencil size={20} />
              </button>
              <button onClick={()=>{
                setOpenDeleteConfirmBox(true)
                setDeleteSubCategory(row.original)
              }} className='p-2 bg-red-100 rounded-full hover:text-red-700'>
              <MdDelete size={20} />
              </button>
            </div>
          )}
        })
  ]

  // console.log("subcategory",data);
  const handleDeleteSubCategory=async()=>{
    try {
      const res = await Axios({
        ...SummaryAPI.deleteSubCategory,
        data : deleteSubCategory
      })

      const { data : responseData } = res

      if(responseData.success){
        toast.success(responseData.message)
        fetchSubCategory()
        setOpenDeleteConfirmBox(false)
        setDeleteSubCategory({_id : ""})
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }


  return (
    <section className=''>
      <div className="p-2  bg-white shadow-md flex justify-between items-center">
        <h2 className="font-semibold">Sub Category</h2>
        <button
        onClick={()=>setopenAddSubCategory(true)}
          className="text-sm border border-amber-300 hover:bg-amber-400 px-3 py-1 rounded"
        >
          Add Sub Category
        </button>
      </div>

    <div className=" w-full max-w-[90vw]">
      <DisplayTable
      data={data}
      column={column}
      />
    </div>


      {
        openAddSubCategory && (
          <UploadSubCategoryModel
          close={()=>setopenAddSubCategory(false)}
          fetchData = {fetchSubCategory}
          />
        )
        }
        {
          ImageURL && 
          <ViewImage url={ImageURL} close={()=>setImageURL("")} />
        }
        {
          openEdit &&
          <EditSubCategory data={editData} close={()=>setOpenEdit(false)} 
          fetchData={fetchSubCategory}
          />
        }
        {
          openDeleteConfirmBox && (
            <ConfirmBox 
            cancel={()=>setOpenDeleteConfirmBox(false)}
            close={()=>setOpenDeleteConfirmBox(false)}
            confirm={handleDeleteSubCategory}
            />
          )
        }
      </section>
  )
}

export default SubCategory
