import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LiaUserSolid } from "react-icons/lia";
import Axios from "../../../utils/Axios";
import SummaryAPI from "../../../common/SummaryAPI";
import AxiosToastError from "../../../utils/AxiosToastError";
import toast from "react-hot-toast";
import fetchUserDetails from "../../../utils/fetchUserDetails";
import { setUser } from "../../../Store/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryAPI.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUser(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div>
    //   <div className="w-16 h-16 flex items-center justify-center rounded-full overflow-hidden drop-shadow-lg  ">
    //     {user.avatar ? (
    //       <img alt={user.name} src={user.avatar} className="w-full h-full" />
    //     ) : (
    //       <LiaUserSolid size={60} />
    //     )}
    //   </div>

    //   <form action="" className="my-4 grid gap-4" onSubmit={handleSubmit}>
    //     <div className="grid ">
    //       <label htmlFor="">Name</label>
    //       <input
    //         type="text"
    //         placeholder="Enter your name"
    //         className="p-2 bg-blue-100 outline-amber-100 border focus-within:border-amber-500 rounded-2xl"
    //         value={userData.name}
    //         name="name"
    //         required
    //         onChange={handleOnChange}
    //       />
    //     </div>
    //     <div className="grid ">
    //       <label htmlFor="email">Email</label>
    //       <input
    //         type="text"
    //         id="email"
    //         placeholder="Enter your email"
    //         className="p-2 bg-blue-100 outline-amber-100 border focus-within:border-amber-500 rounded-2xl"
    //         value={userData.email}
    //         name="email"
    //         required
    //         onChange={handleOnChange}
    //       />
    //     </div>
    //     <div className="grid ">
    //       <label htmlFor="mobile">Mobile</label>
    //       <input
    //         type="number"
    //         placeholder="Enter your mobile number"
    //         className="p-2 bg-blue-100 outline-amber-100 border focus-within:border-amber-500 rounded-2xl"
    //         value={userData.mobile}
    //         name="mobile"
    //         onChange={handleOnChange}
    //       />
    //     </div>
    //     <button className="border px-4 py-2 font-semibold hover:bg-amber-300 border-amber-800 text-xl">
    //       {loading ? "Loading..." : "Submit"}
    //     </button>
    //   </form>
    // </div>

    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full overflow-hidden bg-white border-2 border-gray-200 shadow-sm">
            {user.avatar ? (
              <img
                alt={user.name}
                src={user.avatar}
                className="w-full h-full object-cover"
              />
            ) : (
              <LiaUserSolid className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Account Information
            </h2>
            <p className="text-sm text-gray-600">
              Update your personal details below
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={userData.name}
                name="name"
                required
                onChange={handleOnChange}
              />
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={userData.mobile}
                name="mobile"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={userData.email}
              name="email"
              required
              onChange={handleOnChange}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium rounded-md transition-colors duration-200 flex items-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
