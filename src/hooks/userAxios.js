import React, { useEffect, useState } from 'react'
import axiosApi from '../services/axios'

function useAxios(url) {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(() => {
        const fetchApi = async () => {
            try{ 
                const api = await axiosApi.get(url)
                console.log('api', api)
                if(api.data) {
                    setData(api.data)
                }
            } catch(e) {
                console.log('e', e)
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        fetchApi()
    },[url])

    return {data, loading, error}
}

export default useAxios