import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useMode } from '../../Context/darkMode'
import { Modal } from 'antd'

const Users = () => {
    const {mode} = useMode();
    const [dash, setDash] = useState(false);
  return (
    <Layout title={"All Users"}>
       <div className="container-fluid mt-3 p-3">
                <div className="row">
                <div className="dashboard ml-4">
                        <button className='btn btn-danger' onClick={()=> setDash(true)}>DashBoard Menu ⇓</button>
                        <Modal onCancel={()=> setDash(false)} footer={null} open={dash}><AdminMenu /></Modal>
                    </div>
                    <div className="col-md-3 dashboard1">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 px-2 m-auto mt-2" style={{backgroundColor : mode === 'light' ? 'white' : 'grey', color : mode === 'light' ? 'black' : 'white'}}>
                            <h3 className='text-danger'>All Users</h3>
                        </div>
                    </div>
                </div>
            </div>
    </Layout>
  )
}

export default Users
