import React, { useEffect, useState } from 'react'
import styles from './Categories.module.scss'
import useStyles from '../../../hooks/useStyles'
import { useEditor } from '@tiptap/react'
import axiosApi from './../../../services/axios';
import { toast } from 'react-toastify';

function Categories() {
    const cs = useStyles(styles)
    const [categories, setCategories] = useState([])
    console.log(categories)
    useEffect(() => {
        (async () => {
            try{
                const res = await axiosApi.get('/auth/admin/categories')
                if(res.ec === 0 && res.dt){
                    setCategories(res.dt)
                }
            } catch(e) {
                console.log(e)
                toast(e.ms)
            }
        })()
    },[])

  return (
    <div>Categories</div>
  )
}

export default Categories