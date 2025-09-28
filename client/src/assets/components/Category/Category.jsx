import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../UploadCategoryModel/UploadCategoryModel";
import Loader from "../Loader/Loader";
import NoData from "../NoData/NoData";
import Axios from "../../../utils/Axios";
import SummaryAPI from "../../../common/SummaryAPI";
import EditCategory from "../EditCategory/EditCategory";
import ConfirmBox from "../ConfirmBox/ConfirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../../../utils/AxiosToastError";
import { useSelector } from "react-redux";

const Category = () => {
  const [openUploadCategoryModel, setOpenUploadCategoryModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });

  const [openConfirmBoxDelete,setOpenConfirmBoxDelete] = useState(false)
  const [deleteCategory,setDeleteCategory] = useState({
    _id : ""
  })

  // const allCategory = useSelector(state=> state.product.allCategory)
  
  // useEffect(()=>{
  //   setCategoryData(allCategory)
  // },[allCategory])


  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryAPI.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
      console.log(responseData);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  // console.log("CategoryData",categoryData);

  const handleDeleteCategory = async() => {
    try {
      const response = await Axios({
        ...SummaryAPI.deleteCategory,
        data : deleteCategory
      })

      const { data : responseData} = response

      if(responseData.success){
        toast.success(responseData.message)
        fetchCategory()
        setOpenConfirmBoxDelete(false)
      }
    } catch (error) {
      AxiosToastError(error) 
    }
  }
  return (
    <section>
      <div className="p-3 bg-white shadow-md flex justify-between items-center">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategoryModel(true)}
          className="text-sm border border-amber-300 hover:bg-amber-400 px-3 py-1 rounded"
        >
          Add Category
        </button>
      </div>

      {!categoryData[0] && !loading && <NoData />}

      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
        {categoryData.map((category) => {
          return (
            <div className="w-38 h-50 rounded shadow-md  " key={category._id}>
              <img
                alt={category.name}
                src={category.image}
                className="w-38 p-2 object-contain  h-38"
              />
              <div className="flex items-center h-9 gap-2 p-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="flex-1 bg-green-200 text-green-600 hover:shadow-md font-medium py-1 rounded"
                >
                  Edit
                </button>
                <button onClick={()=>{
                  setOpenConfirmBoxDelete(true)
                  setDeleteCategory(category)
                }} className="flex-1 bg-green-200 text-red-600 hover:shadow-md font-medium py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loader />}

      {openUploadCategoryModel && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategoryModel(false)}
        />
      )}

      {openEdit && (
        <EditCategory data={editData} fetchData={fetchCategory} close={() => setOpenEdit(false)} />
      )}

      {
        openConfirmBoxDelete && (
          <ConfirmBox close={()=>setOpenConfirmBoxDelete(false)} cancel={()=>setOpenConfirmBoxDelete(false)} confirm = {handleDeleteCategory}/>
        )
      }
    </section>
  );
};

export default Category;
