import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../Context/AuthContext'
import { useMode } from '../../Context/darkMode'
import { Modal } from 'antd'

const Dashboard = () => {
  const [auth] = useAuth();
  const { mode } = useMode();
  const [dash, setDash] = useState(false);

  return (
    <Layout title="Dashboard - Ecommerce">
      <div className="container-fluid mt-3">
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
            <div className="card p-3 w-75 m-auto mt-2" style={{ backgroundColor: mode === 'light' ? 'white' : 'grey', color: mode === 'light' ? 'black' : 'white' }}>
              <h2> {auth?.user?.name}</h2>
              <h2> {auth?.user?.email}</h2>
              <h2> {auth?.user?.address}</h2>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
