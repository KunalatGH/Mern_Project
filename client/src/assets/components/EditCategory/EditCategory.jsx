import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import uploadImage from "../../../utils/uploadImage.js";
import Axios from "../../../utils/Axios.js";
import SummaryAPI from "../../../common/SummaryAPI.js";
import toast from "react-hot-toast";
import AxiosToastError from "../../../utils/AxiosToastError.js";
const EditCategory = ({ close, fetchData,data : CategoryData }) => {

      const [data, setData] = useState({
        _id : CategoryData._id,
        name: CategoryData.name,
        image: CategoryData.image
      });

        const [loading, setLoading] = useState(false);
      
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const response = await Axios({
            ...SummaryAPI.updateCategory,
            data : data
          })
          const {data : responseData} = response
    
          if(responseData.success){
            toast.success(responseData.message)
            close()
            fetchData()
          }
        } catch (error) {
          AxiosToastError(error)
        }finally{
          setLoading(false);
        }
      }

    const handleUploadCategoryImages = async(e) => {
        const file = e.target.files[0];
        
        if(!file){      
            return
        }
        setLoading(true)
        const response = await uploadImage(file)
          const {data : ImageResponse} = response 
            setLoading(false)
          setData((prev)=>{
            return {
              ...prev,
              image: ImageResponse.data.url
            }
          })
    
      }
  return (
    
      <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 opacity-98 p-4 flex items-center justify-center ">
            <div className="bg-white max-w-4xl w-full p-4 rounded ">
              <div className="flex items-center justify-between">
                <h1 className="font-semibold">Update Category</h1>
                <button onClick={close} className="w-fit block ml-auto">
                  <IoMdClose size={25} />
                </button>
              </div>
      
      
      
              <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
                <div className="grid gap-1">
                  <label htmlFor="categoryName">Name</label>
                  <input
                    type="text"
                    id="categoryName"
                    name="name"
                    placeholder="Enter category name"
                    value={data.name}
                    onChange={handleOnChange}
                    className="bg-blue-50 p-2 border border-blue-200 rounded outline-none focus-within:border-blue-500"
                  />
                </div>
                <div className="grid gap-1">
                  <p>Image</p>
                  <div className="flex gap-4 flex-col md:flex-row items-center">
                    <div className="border bg-blue-50 h-36 w-full md:w-36 flex items-center justify-center rounded">
                     {
                      data.image ? (
                        <img  alt="category"
                        src={data.image}
                        className="h-full w-full object-scale-down "
                        />
                      ): (
                        <p className="text-sm text-neutral-500">No Image</p>
                      )
                     }
                    </div>
                    <label htmlFor="uploadCategoryImage">
                    <div 
                    className={`
                    ${!data.name ? "bg-gray-300" : "bg-orange-500 hover:bg-orange-600"} px-4 py-2 rounded cursor-pointer
                    `}>
                        {loading ? "Uploading..." : "Upload Image"}
                      </div>
                      <input
                      disabled={!data.name}
                      onChange={handleUploadCategoryImages}
                      type="file" id="uploadCategoryImage" 
                      className="hidden"
                      />
                    </label>
                    
                  </div>
                </div>
      
                <button
                className={`
                  ${data.name && data.image ? "bg-amber-300" : "bg-gray-300 "}
                  py-2 font-semibold 
                  `}
                >Update Category</button>
              </form>
            </div>
          </section>
    
  )
}

export default EditCategory
