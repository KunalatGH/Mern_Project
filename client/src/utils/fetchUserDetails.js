import SummaryAPI from "../common/SummaryAPI";
import Axios from "./Axios"

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryAPI.userDetails
        })        
        return response.data
    } catch (error) {
        console.error("Error fetching user details:", error);
        
    }
}

export default fetchUserDetails