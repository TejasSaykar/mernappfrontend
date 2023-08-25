import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { useMode } from '../../Context/darkMode'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd'
import { BASE_URL } from '../helper'

const CreateCategory = () => {
    const { mode } = useMode();

    const [dash, setDash] = useState(false);

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [visible, setvisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/category/create-category`, { name });
            if (data?.success) {
                toast.success(`${name} is created`);
                setName('');
                getAllCategory();
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong")

        }
    }

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

    // Update Category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${BASE_URL}/api/v1/category/update-category/${selected._id}`, {
                name: updatedName
            });
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName('');
                setvisible(false);
                getAllCategory();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Some thing went wrong")

        }
    }

    // Delete Category
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${BASE_URL}/api/v1/category/delete-category/${id}`);
            if (data.success) {
                let conf = window.prompt("Do you want to delete this category? Then type yes...")
                if(!conf) return;
                toast.success(`Category Deleted Successfully`);
                getAllCategory();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Some thing went wrong")

        }
    }

    return (
        <Layout title={"Create Category"}>
            <div className="container-fluid mt-3 p-3">
                <div className="row">
                    <div className="dashboard text-center">
                        <button className='btn btn-danger' onClick={()=> setDash(true)}>DashBoard Menu ⇓</button>
                        <Modal onCancel={()=> setDash(false)} footer={null} open={dash}><AdminMenu /></Modal>
                    </div>
                    <div className="col-md-3 dashboard1">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="col-md-9 m-auto mt-2" style={{ backgroundColor: mode === 'light' ? 'white' : 'grey', color: mode === 'light' ? 'black' : 'white' }}>
                            <h3 className='text-center text-danger shadow py-2'>Manage Category</h3>
                            <div className="p-3">
                                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                            </div>
                            <div>
                                <table className='table table-bordered w-100'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Name</th>
                                            <th scope='col'>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            categories?.map(c => (
                                                <>
                                                    <tr key={c._id}>
                                                        <td>{c.name}</td>
                                                        <td>
                                                            <button onClick={() => { setvisible(true); setUpdatedName(c.name); setSelected(c) }} className='btn btn-success'>Edit</button>
                                                            <button onClick={() => handleDelete(c._id)} className='btn btn-danger mx-2'>Remove</button>

                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <Modal onCancel={() => setvisible(false)} footer={null} open={visible} >
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                    </Modal>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
