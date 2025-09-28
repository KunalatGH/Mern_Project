import axios from "axios";
import SummaryAPI, { baseURL } from "../common/SummaryAPI";

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

//Sending the access token in the header 
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
    (response) => {
        return response;
        },
        async (error) => {
           let originalRequest = error.config;



           if(error.response.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;
            const refreshToken = localStorage.getItem("refreshToken");
            
            if(refreshToken) {
               const newAccessToken = await refreshAccessToken();
                if(newAccessToken) {
                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                 return Axios(originalRequest);
                }
            }
        }


        return Promise.reject(error);
        }
)
const refreshAccessToken = async()=>{
    try{
        const response =  await Axios({
            ...SummaryAPI.refreshToken,
            headers : {
                Authorization : `Bearer ${refreshAccessToken}`
            }
        })
        const accessToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        return accessToken;        
    }catch(error){
        console.log(error);
    }
}

export default Axios;
