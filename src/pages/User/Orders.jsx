import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { Modal } from 'antd'
import { useAuth } from '../../Context/AuthContext'
import axios from 'axios'
import moment from 'moment'
import { Card } from 'react-bootstrap'
import { BASE_URL } from '../helper'

const Orders = () => {
  const [dash, setDash] = useState(false);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  // console.log("Orders " + orders)

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);


  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid px-3 mt-3">
        <div className="dashboard">
          <button onClick={() => setDash(true)} className='btn btn-danger text-center'>Dashboard ⇓</button>
          <Modal onCancel={() => setDash(false)} footer={null} open={dash}>
            <UserMenu />
          </Modal>
        </div>
        <div className="row">
          <div className="col-md-3 dashboard1">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h3 className='text-center text-danger shadow py-3'>All Orders</h3>
            {
              orders?.map((o, i) => (
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
                        <td>{o?.status}</td>
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
                                  <Card.Img className='cartImg' height={"150px"}src={`${BASE_URL}/api/v1/product/product-img/${p._id}`} alt={p.name} />
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
              ))
            }
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Orders
