import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useCategory = () => {
    const [categories,setCategories] = useState([])

    const getAllCategory = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/category/get-category`)
          if (data?.success) {
            setCategories(data?.category);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      }
    
      useEffect(() => {
        getAllCategory();
      }, []);

  return categories 
}

export default useCategory
