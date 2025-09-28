import { useState} from 'react'
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from '../../../utils/uploadImage';
import Loader from '../Loader/Loader.jsx'
import ViewImage from "../ViewImage/ViewImage.jsx"
import { MdClose, MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import AddFieldComponent from '../AddFieldComponent/AddFieldComponent.jsx';
import Axios from '../../../utils/Axios.js';
import SummaryAPI from '../../../common/SummaryAPI.js';
import AxiosToastError from '../../../utils/AxiosToastError.js';
import successAlert from '../../../utils/SuccessAlert.js';
const UploadProduct = ({close}) => {

  const [data,setData] = useState({
    name: "",
    image: [],
    category: [],
    subcategory : [],
    unit :"",
    stock : "",
    price: "",
    discount : "",
    description: "",
    more_details : {},
  });
  
  const [imageloading,setImageLoading] = useState(false);
  const [viewImageURL,setViewImageURL] = useState("");
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory,setSelectCategory] = useState("");
  const [selectSubCategory,setSelectSubCategory] = useState("");
  const allSubCategory = useSelector(state => state.product.allSubCategory )
  const [moreField, setMoreField] = useState([]);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setData((prevData) =>{ 
        return {
          ...prevData,
          [name]: value
          }
          });
}

  const handleUploadImage = async(e) =>{
    const file = e.target.files[0];

    if(!file){
      return
    }
    setImageLoading(true)
    const response = await uploadImage(file)
      const {data : ImageResponse} = response 
      const imageUrl = ImageResponse.data.url

      setData((prev)=>{
        return {
          ...prev,
          image: [...prev.image,imageUrl]
        }
      })
      setImageLoading(false)
  }

  const handleDeleteImage = async(index)=>{
    data.image.splice(index,1)
    setData((prev)=>{
      return{
        ...prev
        }
    })
  }

  const handleRemoveCategory = async(index)=>{
    data.category.splice(index,1)
    setData((prev)=>{
      return{
        ...prev
        }
      })
  }
  const handleRemoveSubCategory = async(index)=>{
    data.subcategory.splice(index,1)
    setData((prev)=>{
      return{
        ...prev
        }
      })
  }

  const handleAddField = ()=>{
    setData((prev)=>{
      return{
        ...prev,
        more_details : {
          ...prev.more_details,
          [fieldName] : ""
        }
      }
  })
  setFieldName("")
  setOpenAddField(false)
}

const handleSubmit = async(e)=>{
  e.preventDefault()
  console.log("Data",data)

  try {
    const res = await Axios({
      ...SummaryAPI.createProduct,
      data : data
    })
    const {data : responseData} = res

    if( responseData.success ){
      successAlert(responseData.message)
      setData({
        name: "",
        image: [],
        category: [],
        subcategory : [],
        unit :"",
        stock : "",
        price: "",
        discount : "",
        description: "",
        more_details : {},
      })
    }
  } catch (error) {
    AxiosToastError(error)
  }
}
  // useEffect(()=>{
  //   successAlert("Upload Successfully")
  // },[])

  return (
    <section>
      <div className="p-2  bg-white shadow-md flex justify-between items-center">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      <div className="grid p-3">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input 
            id='name'
            type="text"
            placeholder="Enter Product Name"
            name='name'
            onChange={handleChange}
            value={data.name}
            required
            className='bg-blue-50 outline-none border focus-within:border-amber-300'
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="description">Description</label>
            <textarea 
            id='description'
            type="text"
            placeholder="Enter Product Description"
            name='description'
            onChange={handleChange}
            value={data.description}
            required
            multiple
            rows={3}
            className='bg-blue-50 outline-none border focus-within:border-amber-300 rounded resize-none'
            />
          </div>
          <div className="">
            <p>Image</p>
            <div className="">
              <label className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer">
                <div className="text-center flex justify-center items-center flex-col">
                  {
                    imageloading ? <Loader/> : (
                      <>
                      <IoMdCloudUpload size={35}/>
                      <p>Upload Image</p>
                      </>
                    )
                  }
                </div>
                <input 
                type="file"
                id='productImage'
                className='hidden'
                accept='image/*'
                onChange={handleUploadImage} />
              </label>
              <div className=" flex flex-wrap gap-3">
                {
                  data.image.map((img,index)=>{
                    return(
                      <div key={img+index} className="h-20 mt-2 w-20 min-w-20 bg-blue-50 border relative group">
                        <img src={img} alt={img}
                        onClick={()=>{setViewImageURL(img)}}
                        className='w-full h-full object-scale-down cursor-pointer'
                        />
                        <div onClick={()=>{handleDeleteImage(index)}} className="absolute bottom-0 right-0 p-1 bg-red-500 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer">
                          <MdDelete/>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="grid gap-1">
                  <label htmlFor="">Category</label>
                  <div className="">
                    <select className='bg-blue-50 border w-full p-2 rounded'
                    value={selectCategory}
                    onChange={(e)=>{
                      const value = e.target.value
                      const category = allCategory.find(el => el._id === value)
                      console.log(category);

                      setData((prev)=>{
                        return{
                          ...prev,
                          category : [...prev.category,category]
                        }
                      })
                      setSelectCategory("")
                      
                    }}
                    >
                      <option value={""}>Select Category</option>
                      {
                        allCategory.map((c,index)=>{
                          return(
                            <option 
                            key={c+index}
                            value={c?._id}>{c.name}</option>
                          )
                        })
                      }

                    </select>
                      <div className="flex flex-wrap gap-3">
                        {
                          data.category.map((c,index)=>{
                            return(
                              <div className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                              key={c._id+index+"productsection"}
                              >
                                <p>{c.name}</p>
                                <div className="hover:text-red-500 cursor-pointer"
                                onClick={()=>{handleRemoveCategory(index)}}
                                >
                                  <MdClose size={20} />
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>

                  </div>
          </div>

          <div className="grid gap-1">
                  <label htmlFor="">Select Sub Category</label>
                  <div className="">
                    <select className='bg-blue-50 border w-full p-2 rounded'
                    value={selectSubCategory}
                    onChange={(e)=>{
                      const value = e.target.value
                      const subCategory = allSubCategory.find(el => el._id === value)
                      setData((prev)=>{
                        return{
                          ...prev,
                          subcategory : [...prev.subcategory,subCategory]
                        }
                      })
                      selectSubCategory("")
                      
                    }}
                    >
                      <option value={""}>Select Category</option>
                      {
                        allSubCategory.map((c,index)=>{
                          return(
                            <option 
                            key={c+index}
                            value={c?._id}>{c.name}</option>
                          )
                        })
                      }

                    </select>
                      <div className="flex flex-wrap gap-3">
                        {
                          data.subcategory.map((c,index)=>{
                            return(
                              <div className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                              key={c._id+index+"productsection"}
                              >
                                <p>{c.name}</p>
                                <div className="hover:text-red-500 cursor-pointer"
                                onClick={()=>handleRemoveSubCategory(index)}
                                >
                                  <MdClose size={20} />
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>

                  </div>
                </div>

          <div className="grid gap-1">
            <label htmlFor="unit">Unit</label>
            <input 
            id='unit'
            type="text"
            placeholder="Enter Product Unit"
            name='unit'
            onChange={handleChange}
            value={data.unit}
            required
            className='bg-blue-50 outline-none border focus-within:border-amber-300'
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="stock">Number of Stock</label>
            <input
            id='stock'
            type="number"
            placeholder="Enter Product Stock"
            name='stock'
            onChange={handleChange}
            value={data.stock}
            required
            className='bg-blue-50 outline-none border focus-within:border-amber-300'
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="price">Price </label>
            <input
            id='e'
            type="number"
            placeholder="Enter Product Price"
            name='price'
            onChange={handleChange}
            value={data.price}
            required
            className='bg-blue-50 outline-none border focus-within:border-amber-300'
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="discount">Discount </label>
            <input
            id='e'
            type="number"
            placeholder="Discount"
            name='discount'
            onChange={handleChange}
            value={data.discount}
            required
            className='bg-blue-50 outline-none border focus-within:border-amber-300'
            />
          </div>

          {
            Object?.keys( data?.more_details)?.map((k,index)=>{
              return(
                <div
                key={index}
                className="grid gap-1">
            <label htmlFor={k}>{k}</label>
            <input
            id={k}
            type="text"
            value={data?.more_details[k]}
            onChange={(e)=>{
              const value = e.target.value
              setData((prev)=>{
                return{
                  ...prev,
                  more_details:{
                    ...prev.more_details,
                    [k] : value
                  }
                }
              })
            }}
            required
            className='bg-blue-50 outline-none border focus-within:border-amber-300'
            />
          </div>
              )
            })
          }
          <div onClick={()=>{setOpenAddField(true)}} className="bg-amber-400 hover:bg-white py-1 px-3 w-32 text-center font-semibold border border-amber-300 hover:text-neutral-900 cursor-pointer rounded duration-200">Add Fields</div>

          <button className='bg-amber-400 hover:bg-amber-500 py-2 rounded font-semibold duration-200'>
            Submit
          </button>

        </form>
      </div>
      {
        viewImageURL && (
          <ViewImage url={viewImageURL} close={()=>setViewImageURL("")}/>
        )
      }
      {
        openAddField && (
          <AddFieldComponent
          value={fieldName}
          onChange={(e)=>setFieldName(e.target.value)}
          submit={handleAddField}
          close={()=>setOpenAddField(false)}/>
        )
      }
      </section>
  )
}

export default UploadProduct
