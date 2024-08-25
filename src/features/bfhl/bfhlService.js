import axios from 'axios'

const API_URL = 'https://bfhl-backend-b731.onrender.com/api/user/bfhl/'


const processData = async (data) => {

  const response = await axios.post(API_URL, data)

  return response.data
}

const getBFHL = async () => {
    
  
    const response = await axios.get(API_URL)
  
    return response.data
  }
  
const bfhlService = {
    processData,
    getBFHL,
  }
  
  export default bfhlService