import Header from './assets/components/Header/Header.jsx'
import Footer from './assets/components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails.js';
import { setUser } from './Store/userSlice.js';
import { useDispatch } from 'react-redux';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './Store/productSlice.js';
import SummaryAPI from './common/SummaryAPI.js';
import Axios from './utils/Axios.js';
import { handleAddItemCart } from './Store/cartProduct.js';
import GlobalProvider from './provider/GlobalProvier.jsx';
import { FaShoppingCart } from "react-icons/fa";
import CardMobile from './assets/components/CardMobile/CardMobile.jsx';


const Layout = () => {
  const dispatch = useDispatch()

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUser(userData.data))

    
  }

const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryAPI.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data.sort((a,b)=>a.name.localeCompare(b.name))))
        // setCategoryData(responseData.data);
      }
    } catch (error) {
      return error;
    } finally {
      dispatch(setLoadingCategory(false))
    }
  };

  const fetchSubCategory = async () => {
    try {
      // setLoading(true); 
      const response = await Axios({
        ...SummaryAPI.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data))
        // setCategoryData(responseData.data);
      }
    } catch (error) {
      return error;
    } finally {
      // setLoading(false);
    }
  };

  


  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    // fetchCartItem()
  },[])
  
  return (
   <GlobalProvider>
    <Header/>
    <main className='min-h-[80vh]'>
    <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
    {
      location.pathname !== '/checkout' && (
        <CardMobile/>
      )
    }
   </GlobalProvider>
 
  )
}

export default Layout
