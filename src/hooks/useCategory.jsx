import {useState, useEffect} from 'react'
import axios from 'axios'
import { BASE_URL } from '../pages/helper';

export default function useCategory() {
    const [categories, setCategories] = useState([]);
    

    // Get Categories
    const getCategories = async () => {
        try {
            const {data} = await axios.get(`${BASE_URL}/api/v1/category/all-category`);
            setCategories(data?.category)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getCategories();
    },[]);

    return categories;
}