import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { useMode } from '../../Context/darkMode'
import { Modal } from 'antd'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../helper'
const { Option } = Select;

const CreateProduct = () => {
    const { mode } = useMode();
    const [dash, setDash] = useState(false);

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [qty, setQty] = useState('');
    const [shipping, setShipping] = useState('');
    const [img, setImg] = useState('');

    // Get all Categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/category/all-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong")

        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    // Create Product Fun
    const handleCreate = async(e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name" , name);
            productData.append("description" , description);
            productData.append("price" , price);
            productData.append("qty" , qty);
            productData.append("img" , img);
            productData.append("category" , category);

            const {data} = await axios.post(`${BASE_URL}/api/v1/product/create-product`,productData)
            if(data?.success){
                toast.success("Product created successfully");
                navigate("/dashboard/admin/products");
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            
        }
    }



    return (
        <Layout title={"Create Product"}>
            <div className="container-fluid mt-3 p-3">
                <div className="row">
                    <div className="dashboard text-center">
                        <button className='btn btn-danger' onClick={() => setDash(true)}>DashBoard Menu ⇓</button>
                        <Modal onCancel={() => setDash(false)} footer={null} open={dash}><AdminMenu /></Modal>
                    </div>
                    <div className="col-md-3 dashboard1">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 px-2 m-auto mt-2" style={{ backgroundColor: mode === 'light' ? 'white' : 'grey', color: mode === 'light' ? 'black' : 'white' }}>
                            <h3 className='text-danger mt-2'>Create Product</h3>
                            <div className="m-1 w-75">
                                <Select bordered={false} placeholder="Select a Category" size='large' className='form-control mb-3' showSearch onChange={(value) => { setCategory(value) }}>
                                    {categories?.map(c => (
                                        <Option key={c._id} value={c._id}>{c.name}</Option>
                                    ))}

                                </Select>
                                <div className="mb-3">
                                    <label className='btn btn-outline-danger col-md-12'>
                                        {img ? img.name : "Upload Image"}
                                        <input type="file" name='img' accept='image/*' onChange={(e)=> setImg(e.target.files[0])} hidden />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    {img && (
                                        <div className="text-center">
                                            <img src={URL.createObjectURL(img)} alt={img.name} height={'200px'} className='img img-responsive'/>
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={name} placeholder='Write a name' className='form-control' onChange={(e)=> setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <textarea type="text" value={description} placeholder='Write a Description' className='form-control' onChange={(e)=> setDescription(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={price} placeholder='Write a Price' className='form-control' onChange={(e)=> setPrice(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={qty} placeholder='Write a Quantity' className='form-control' onChange={(e)=> setQty(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <Select 
                                        bordered={false}
                                        placeholder="Select shipping"
                                        size='large'
                                        showSearch
                                        className='form-control mb-3'
                                        onChange={(value)=> setShipping(value)}
                                    >
                                        <Option value='0'>Yes</Option>
                                        <Option value="1">No</Option>

                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <button className='btn btn-success' onClick={handleCreate}>Create Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
