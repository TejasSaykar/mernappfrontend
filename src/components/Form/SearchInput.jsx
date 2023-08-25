import React from 'react'
import { useSearch } from '../../Context/SearchContext'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { BASE_URL } from '../../pages/helper';

const SearchInput = ({setShow}) => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const [auth, setAuth] = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
            toast.error("Enter the value")

        }
    }


    return (
        <div>
            <form className='d-flex my-2' role='search' onSubmit={handleSubmit}>
                <input type="search" className='form-control me-2' placeholder='Search' value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <button type='submit' onClick={()=> {setShow(false)}}  className='btn btn-outline-danger'>Search</button>
            </form>
        </div>
    )
}

export default SearchInput
