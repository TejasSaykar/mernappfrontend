import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import { Select } from 'antd';
import { BASE_URL } from '../helper';
const { Option } = Select


const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Deliverd", "cancel"]);
    const [changeStatus, setChangeStatus] = useState();

    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/auth/all-orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            const {data} = await axios.put(`${BASE_URL}/api/v1/auth/order-status/${orderId}`,{
                status : value
            });
            getOrders();
        } catch (error) {
            console.log(error)
            
        }
    }

    return (
        <Layout title={"All Orders Data"}>
            <div className="row p-3 mt-3">
                <div className="col-md-3 ">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h2 className='text-center text-danger shadow py-3'>All Orders</h2>
                    {
                        orders?.map((o, i) => {
                            return (
                                <div className="order shadow">
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>Sr No.</th>
                                                <th scope='col'>Status</th>
                                                <th scope='col'>Buyer</th>
                                                <th scope='col'>Orders Date</th>
                                                <th scope='col'>Payment</th>
                                                <th scope='col'>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <Select bordered={false} onChange={(value) => handleChange(o._id,value)} defaultValue={o?.status}>
                                                        {
                                                            status?.map((s, i) => (
                                                                <Option key={i} value={s}>{s}</Option>
                                                            ))
                                                        }

                                                    </Select>
                                                </td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createdAt).fromNow()}</td>
                                                <td>{o?.payment?.success ? "Success" : "Fails"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {
                                            o?.products?.map((p, i) => (
                                                <>
                                                    <div className="row mb-3 p-3 card flex-row" key={p._id}>
                                                        <div className="col-md-4">
                                                            <Card className='m-1 cardImg'>
                                                                <Card.Img className='cartImg' height={"150px"} src={`${BASE_URL}/api/v1/product/product-img/${p._id}`} alt={p.name} />
                                                            </Card>
                                                        </div>
                                                        <div className="col-md-8 text-center">
                                                            <p className='my-1 p-0' style={{ fontWeight: "600" }}>{p.name}</p>
                                                            <p className='my-1 p-0' style={{ fontWeight: "600" }}>{p.description}</p>
                                                            <p className='my-1 p-0' style={{ fontWeight: "600" }}>Price : ₹{p.price}.00</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders
