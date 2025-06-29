import axiosApi from "../../../services/axios"

export const fetchOrders = async (userId) => {
    const data = await axiosApi.post('/get-orders', { userId: userId })
    if(data?.ec === 0 && data?.dt) {
      return data.dt
    }
    return null
}