import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../Divider/Divider";
import Axios from "../../../utils/Axios";
import SummaryAPI from "../../../common/SummaryAPI";
import { logout } from "../../../Store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../../../utils/AxiosToastError";
import { HiExternalLink } from "react-icons/hi";
import isAdmin from "../../../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryAPI.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/home");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (!close) {
      close();
    }
  }

  return (
    <div className="p-3">
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex justify-start items-center gap-2 p-1">
        {user.name || user.mobile} 
        <span className="text-medium text-red-500 ">({user.role === "ADMIN" ? "Admin" : ""})</span>
        <Link onClick={handleClose} to={"/dashboard/profile"} className="hover:text-orange-300 duration-250">
          <HiExternalLink size={16} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm font-semibold gap-2 grid p-1 ">
      
      {
        isAdmin(user.role) && (
        <Link onClick={handleClose} to={"/dashboard/category"} className="transition-transform duration-205 ease-in-out hover:bg-gray-200 ">
          Category
        </Link>

        )}
      

      {
        isAdmin(user.role) && (
        <Link onClick={handleClose} to={"/dashboard/sub-category"} className="transition-transform duration-205 ease-in-out hover:bg-gray-200 ">
          Sub-Category
        </Link>

        )}
        {
        isAdmin(user.role) && (
        <Link onClick={handleClose} to={"/dashboard/upload-product"} className="transition-transform duration-205 ease-in-out hover:bg-gray-200 ">
          Upload Product
        </Link>

        )}
        {
        isAdmin(user.role) && (
          <Link onClick={handleClose} to={"/dashboard/product"} className="transition-transform duration-205 ease-in-out hover:bg-gray-200 ">
          Product
        </Link>
        )
      }
        <Link onClick={handleClose} to={"/dashboard/my-orders"} className="transition-transform duration-205 ease-in-out hover:bg-gray-200 ">
          My Orders
        </Link>
        <Link onClick={handleClose} to={"/dashboard/address"} className="transition-all duration-205 ease-in-out hover:bg-gray-200">
          Save Address
        </Link>
        <button
          className="cursor-pointer transition-all duration-205 ease-in-out hover:bg-gray-300"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
