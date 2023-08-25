import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Modal, Checkbox } from 'antd'
import { BASE_URL } from '../helper'


const Products = () => {
    const [products, setProducts] = useState([]);

    const [dash, setDash] = useState(false)

    // Get all Products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-product`)
            setProducts(data?.products);
        } catch (error) {
            toast.error("Something Went Wrong");

        }
    }

    // Lifecycle Method
    useEffect(() => {
        getAllProducts();
    }, [])


    return (
        <Layout>
            <div className="row mt-3 p-3">
                <div className="dashboard text-center">
                    <button className='btn btn-danger' onClick={() => setDash(true)}>DashBoard Menu ⇓</button>
                    <Modal onCancel={() => setDash(false)} footer={null} open={dash}><AdminMenu /></Modal>
                </div>
                <div className="col-md-3 dashboard1">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className='text-center'><h2 className='text-danger shadow py-3'>All Products List</h2></div>
                    <div className="mb-3 d-flex flex-wrap justify-content-center align-items-center ">

                        {
                            products?.map(p => (
                                <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} color='black' style={{ textDecoration: "none" }}>
                                    <Card className='m-1' style={{ width: "18rem" }}>
                                        <Card.Img height={'300px'} src={`${BASE_URL}/api/v1/product/product-img/${p._id}`} alt={p.name} />
                                        <Card.Body>
                                            <Card.Title>{p.name}</Card.Title>
                                            <Card.Subtitle>{p.description}</Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                </Link>

                                // <div className="card m-2" key={p._id}>
                                //     <img src="" alt="" />
                                //     <div className="card-body">
                                //         <div className="card-title">{p.name}</div>
                                //     </div>
                                // </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
