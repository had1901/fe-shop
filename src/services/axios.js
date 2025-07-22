import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL


const axiosApi = axios.create({
    baseURL: apiUrl,
    timeout: 30000,
    withCredentials: true
})





axiosApi.interceptors.request.use((request) => {
  // console.log('request', request)
  return request

}, (error) => {
  // console.log('error-request', error)
  return Promise.reject(error)

})




axiosApi.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  console.log(error.response)
  if(error.response?.data?.hasToken === false) {
    const handleLogout = async () => {
      return await axiosApi.post('/auth/logout', {})
    }
    handleLogout()
  }
  // console.log('error-response', error)
  return Promise.reject(error.response?.data || { ms: 'Lỗi không xác định Axios', ec: 1, er: error })
})

export default axiosApi
