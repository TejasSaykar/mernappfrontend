import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast'
import '../../components/styles/authStyle.css'
import { BASE_URL } from '../helper';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/auth/forgot-password`,{
                email,newPassword,answer
            });
            if(res.data && res.data.success){
                toast.success(res.data && res.data.message);
                navigate("/login")
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error("Invalid Credentaials")
            
        }
   }

    return (
        <Layout>
            <div className="register">
                <form onSubmit={handleSubmit} className='form'>
                    <h2 className='text-center'>Reset Password</h2>


                    <div className="mb-3 formdata">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' id="email" autoComplete='off' placeholder='Enter your email' required />
                    </div>

                    <div className="mb-3 formdata">
                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className='form-control' id="answer" autoComplete='off' placeholder='Enter your favorite sport' required />
                    </div>

                    <div className="mb-3 formdata">
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='form-control' id="password" autoComplete='off' placeholder='Enter your New password' required />
                    </div>
                    
                    <div className="forgorPass d-grid text-center my-2">
                        <button className='btn btn-danger'>Reset</button>
                    </div>

                </form>
            </div>
        </Layout>
    )
}

export default ForgotPass
