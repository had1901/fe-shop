import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'http://localhost:8888/',
    timeout: 10000,
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
  if(error.response?.status === 404) {
    const handleLogout = async () => {
      return await axiosApi.post('/auth/logout', {})
    }
    handleLogout()
  }
  // console.log('error-response', error)
  return Promise.reject(error.response.data)
})

export default axiosApi
