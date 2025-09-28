import { useState } from "react";
import toast from "react-hot-toast";
import SummaryAPI from "../../../common/SummaryAPI";
import Axios from "../../../utils/Axios";
import AxiosToastError from "../../../utils/AxiosToastError";
import {  useNavigate , Link} from "react-router-dom";
import fetchUserDetails from "../../../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Store/userSlice";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryAPI.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        
        const userDetails = await fetchUserDetails()
        dispatch(setUser(userDetails.data))

        setData({
          email: "",
          password: "",
        })
        navigate('/home')
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3xl max-w-md -mt-50">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={data.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700"> Password</label>
            <input
              type="password"
              value={data.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Link to={'/forgot-password'}
             className="text-gray-700 text-sm mt-1 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer transition duration-200 hover:bg-gray-200 hover:text-blue-500">
              Forgot Password 
            </Link>
          </div>

          <button className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-300 transition duration-400">
            Login
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          New User ? <Link to={'/register'}
          className="font-semibold text-pink-500 hover:text-pink-700 transition duration-200">
            Register
            </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
