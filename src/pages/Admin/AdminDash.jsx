import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../Context/AuthContext'
import { useMode } from '../../Context/darkMode'
import { Modal } from 'antd'

const AdminDash = () => {
  const [auth] = useAuth();
  const { mode } = useMode();

  const [dash, setDash] = useState(false);
  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container-fluid p-3 mt-3">
        <div className="row">
          <div className="dashboard">
            <button className='btn btn-danger my-2 text-center' onClick={() => setDash(true)}>DashBoard Menu ⇓</button>
            <Modal onCancel={()=> setDash(false)} footer={null} open={dash}><AdminMenu /></Modal>
          </div>
          <div className="col-md-3 dashboard1">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 px-2 m-auto" style={{ backgroundColor: mode === 'light' ? 'white' : 'grey', color: mode === 'light' ? 'black' : 'white' }}>
              <h3>Admin Name : {auth?.user?.name}</h3>
              <h3>Admin Email : {auth?.user?.email}</h3>
              <h3>Admin Phone : {auth?.user?.phone}</h3>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDash
