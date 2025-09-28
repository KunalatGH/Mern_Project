import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../assets/components/Home/Home";
import Layout from "../Layout";
import Register from "../assets/components/Register/Register";
import Login from "../assets/components/Login/Login";
import ForgotPassword from "../assets/components/ForgotPassword/forgotPassword";
import OPTVerification from "../assets/components/OTPVerify/OPTVerification";
import ResetPassword from "../assets/components/ResetPassword/ResetPassword";
import VerifyEmail from "../assets/components/VerifyEmail/verifyEmail";
import UserMenuMobile from "../assets/components/UserMenuMobile/UserMenuMobile";
import Dashboard from "../Layout/Dashboard";
import Profile from "../assets/components/Profile/Profile";
import MyOrders from "../assets/components/MyOrders/MyOrders";
import Address from "../assets/components/Address/Address";
import Category from "../assets/components/Category/Category";
import SubCategory from "../assets/components/SubCategoryPage/SubCategoryPage";
import UploadProduct from "../assets/components/UploadProduct/UploadProduct";
import ProductAdmin from "../assets/components/ProductAdmin/ProductAdmin";
import AdminPermission from "../Layout/AdminPermission";
import ProductListPage from "../assets/components/ProductListPage/ProductListPage";
import ProductDisplayPage from "../assets/components/ProductDisplayPage/ProductDisplayPage";
import Search from "../assets/components/Search/Search";
import CardMobile_2 from "../assets/components/CartMobile_2/CartMobile_2";
import CheckoutPage from "../assets/components/CheckoutPage/CheckoutPage";
import Success from "../assets/components/Success/Success";
import Cancel from "../assets/components/Cancel/Cancel";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element = {<Layout/>}>
            <Route path="home" element = {<Home/>}/>
            <Route path="search" element = {<Search/>}/>
            <Route path="register" element = {<Register/>}/>
            <Route path="verify-email" element={<VerifyEmail/>}/>
            <Route path="login" element = {<Login/>}/>
            <Route path="forgot-password" element = {<ForgotPassword/>}/>
            <Route path="otp-verification" element = {<OPTVerification/>}/>
            <Route path="reset-password" element = {<ResetPassword/>}/>
            <Route path="user" element = {<UserMenuMobile/>}/>
            <Route path="dashboard" element = {<Dashboard/>}>
                <Route path="profile" element = {<Profile/>}/>
                <Route path="my-orders" element = {<MyOrders/>}/>
                <Route path="address" element = {<Address/>}/>
                <Route path="category" element = {<AdminPermission>
                    <Category/>
                    </AdminPermission>
                    }/>
                <Route path="sub-category" element = {<AdminPermission>
                    <SubCategory/>
                </AdminPermission>
                    }/>
                <Route path="upload-product" element = {<AdminPermission>
                    <UploadProduct/>
                    </AdminPermission>
                }/>
                <Route path="product" element = {<AdminPermission>
                    <ProductAdmin/>
                </AdminPermission>
                    }/>
            </Route>
            <Route path=":category" >
                <Route path=":subcategory" element = {<ProductListPage/>}/>
            </Route>
            <Route path="product/:product" element = {<ProductDisplayPage/>}/>
            <Route path="cart" element = {<CardMobile_2/>}/>
            <Route path="checkout" element = {<CheckoutPage/>}/>
            <Route path="success" element = {<Success/>}/>
            <Route path="cancel" element = {<Cancel/>}/>
        </Route>
    )
)

export default router;