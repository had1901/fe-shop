import { useState } from "react"
import axiosApi from "../services/axios"


const usePost = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const postData = async (url, payload) => {
        setLoading(true)
        try{
            const res = await axiosApi.post(url, payload)
            setData(res.data)
        } catch(e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }
    return { data, loading, postData, error }
}
export default usePost