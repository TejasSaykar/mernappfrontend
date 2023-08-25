import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import toast from 'react-hot-toast'
import '../../components/styles/authStyle.css'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'
import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../helper'

const Profile = () => {

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dash, setDash] = useState(false);

  // Get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${BASE_URL}/api/v1/auth/update-profile`, {
        name, email, password, phone, address
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updateUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data?.updateUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success("Profile updateded successfully");
      }
    } catch (error) {
      console.log("Error while register");
      toast.error("Something Went Wrong");


    }
  }


  return (
    <Layout title={"Your Profile"}>
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

            <div className="register">
              <form onSubmit={handleSubmit} className='form'>
                <h2 className='text-center'>Update Profile</h2>
                <div className="mb-3 formdata">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='form-control' id="name" placeholder='Update your name' />
                </div>

                <div className="mb-3 formdata">
                  <input type="email" disabled value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' id="email" placeholder='Enter your email' />
                </div>

                <div className="mb-3 formdata">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' id="password" placeholder='Update your password' />
                </div>

                <div className="mb-3 formdata">
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className='form-control' id="phone" placeholder='Update your phone number' />
                </div>

                {/* <div className="mb-3 formdata">
                  <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className='form-control' id="sport" placeholder='Eneter your favorite sport' />
                </div> */}

                <div className="mb-3 formdata">
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='form-control' id="sport" placeholder='Update your address' />
                </div>

                <div className="d-grid">
                  <button type='submit' className='btn btn-danger mb-2'>Update</button>
                </div>

              </form>
            </div>

          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Profile
