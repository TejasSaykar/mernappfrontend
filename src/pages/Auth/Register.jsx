import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import '../../components/styles/authStyle.css'
import { BASE_URL } from '../helper';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('')


    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post('http://localhost:8080/api/v1/auth/register', {
    //             name, email, password, phone, address
    //         });
    //         if (res && res.data.success) {
    //             toast.success(res.data && res.data.message);
    //             navigate("/login")
    //         } else {
    //             toast.error(res.data.message)
    //         }
    //     } catch (error) {
    //         console.log("Error while register")
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/auth/register`,{
                name,email,password,phone,address, answer
            });
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate("/login");
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error while register");
            
        }
    }

    return (
        <Layout title="Register - Ecommerce app">
            <div className="register">
                <form onSubmit={handleSubmit} className='form'>
                    <h2 className='text-center'>Register page</h2>
                    <div className="mb-3 formdata">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='form-control' id="name" autoComplete='off' placeholder='Enter your name' required />
                    </div>

                    <div className="mb-3 formdata">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' id="email" autoComplete='off' placeholder='Enter your email' required />
                    </div>

                    <div className="mb-3 formdata">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' id="password" autoComplete='off' placeholder='Enter your password' required />
                    </div>

                    <div className="mb-3 formdata">
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className='form-control' id="phone" autoComplete='off' placeholder='Enter your phone number' required />
                    </div>

                    <div className="mb-3 formdata">
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='form-control' id="address" autoComplete='off' placeholder='Eneter your address' required />
                    </div>

                    <div className="mb-3 formdata">
                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className='form-control' id="sport" autoComplete='off' placeholder='Eneter your favorite sport' required />
                    </div>

                    <div className="d-grid">
                        <button type='submit' className='btn btn-danger mb-2'>Register</button>
                        <Link className='text-center' to="/login">Already have account ? Login</Link>
                    </div>

                </form>
            </div>
        </Layout>
    )
}

export default Register
