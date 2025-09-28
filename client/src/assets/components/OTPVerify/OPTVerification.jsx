import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SummaryAPI from "../../../common/SummaryAPI";
import Axios from "../../../utils/Axios";
import AxiosToastError from "../../../utils/AxiosToastError";
import { useNavigate , Link, useLocation} from "react-router-dom";
const OPTVerification = () => {
  const [data, setData] = useState(["", "", "", "", "",""]);

  const navigate = useNavigate()

  const inputRef = useRef([])
  const location = useLocation()

  console.log(location);
  
    useEffect(()=>{
        if(!location?.state?.email){ 
            navigate('/forgot-password')
        }
    },[])


  const handleSubmit = async (e) => {                       
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryAPI.forgot_password_otp_verification,
        data: {
            otp: data.join(""),
            email : location?.state?.email
        }
      });
      
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "",""])
        navigate('/reset-password',{
          state: {
            data: response.data,
            email : location?.state?.email
          }
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
          Enter Opt
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className="block text-gray-700">Enter otp</label>
            <div className="flex">
                {
                    data.map((element, index) => {
                       return(
                        <input
                        key={"otp"+ index}
                        type="text"
                        ref={(ref)=>{
                            inputRef.current[index] = ref
                            return ref
                        }}
                        value={data[index]}
                        maxLength={1}
                        onChange={(e)=>{
                            const value = e.target.value
                            console.log(value);
                            const newData = [...data]
                            newData[index] = value
                            setData(newData)

                            if(value && index < 5){
                                inputRef.current[index+1].focus()
                            }
                            
                        }}
                        className="w-14 mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                       )
                       }) 
                }
            </div>
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

export default OPTVerification;
