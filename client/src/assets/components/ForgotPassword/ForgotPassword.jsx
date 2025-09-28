import { useState } from "react";
import toast from "react-hot-toast";
import SummaryAPI from "../../../common/SummaryAPI";
import Axios from "../../../utils/Axios";
import AxiosToastError from "../../../utils/AxiosToastError";
import {  useNavigate , Link} from "react-router-dom";
const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate()

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
        ...SummaryAPI.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/otp-verification',{
          state: data
        })
        setData({
          email: "",
        })
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3xl max-w-md -mt-50">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
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

          <button className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-300 transition duration-400">
            Verify
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

export default ForgotPassword;
