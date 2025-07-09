import React, { useCallback, useEffect, useState } from 'react'
import axiosApi from '../services/axios'

function useFetch() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleApi = useCallback(async (method, url, body = null) => {
            try{ 
                setLoading(true)
                const res = await axiosApi({
                    url,
                    method,
                    data: body
                })
                console.log('useFetch', res)
                if(res.ec === 0) {
                    if(res.dt) {
                        setData(res.data)
                    }
                    setLoading(false)
                }
                return res
            } catch(e) {
                console.log('error-userFetch', e)
                setError(e.ms)
            } finally {
                setLoading(false)
            }
        },[])

    return [data, loading, error, handleApi]
}

export default useFetch