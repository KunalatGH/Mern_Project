import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "../../../utils/Axios";
import AxiosToastError from "../../../utils/AxiosToastError";
import SummaryAPI from "../../../common/SummaryAPI";
import toast from "react-hot-toast";
const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!location?.state?.data?.success){
      // navigate("/");
    }
    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryAPI.resetPassword,
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login')
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        })
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };



  console.log("Data", data);

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-3xl max-w-md -mt-50">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Enter Your Password
      </h2>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

        <div>
          <label className="block text-gray-700">New Password:</label>
          <input
            type="password"
            value={data.newPassword}
            name="newPassword"
            onChange={handleChange}
            placeholder="Enter your new password"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Confirm Password:</label>
          <input
            type="password"
            value={data.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Enter your confirm password"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-300 transition duration-400">
          Set Password
        </button>
      </form>

      <p className="text-gray-600 text-center mt-4">
        Already have a Account ? <Link to={'/login'}
        className="font-semibold text-pink-500 hover:text-pink-700 transition duration-200">
          Login
          </Link>
      </p>
    </div>
  </div>
  );
};

export default ResetPassword;
