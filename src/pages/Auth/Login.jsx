import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast'
import '../../components/styles/authStyle.css'
import { useAuth } from '../../Context/AuthContext';
import { BASE_URL } from '../helper';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
                email, password
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user : res.data.user,
                    token : res.data.token
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state ||"/")
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid Credentials")
        }
    }

//    const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:8080/api/v1/auth/login",{
//                 email,password
//             });
//             if(res && res.data.success){
//                 toast.success(res.data && res.data.message);
//                 setAuth({
//                     ...auth,
//                     user : res.data.user,
//                     token : res.data.token
//                 });
//                 navigate(location.state || "/")
//             }else{
//                 toast.error(res.data.message)
//             }
//         } catch (error) {
//             toast.error("Invalid Credentaials")
            
//         }
//    }

    return (
        <Layout title={"Login - Ecommerce"}>
            <div className="register">
                <form onSubmit={handleSubmit} className='form'>
                    <h2 className='text-center'>Login page</h2>


                    <div className="mb-3 formdata">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' id="email" autoComplete='off' autoFocus placeholder='Enter your email' required />
                    </div>

                    <div className="mb-3 formdata">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' id="password" autoComplete='off' placeholder='Enter your password' required />
                    </div>

                    <div className="d-grid">
                        <button type='submit' className='btn btn-danger'>Login</button>
                    </div>
                    <div className="forgorPass d-flex flex-column text-center my-2">
                        <button className='btn btn-secondary'><Link to={"/forgotpass"} style={{textDecoration : "none", color : "white"}}>Forgot Password</Link></button>
                        <Link to="/register" className='my-2'>Don't have an account ? Register</Link>
                    </div>

                </form>
            </div>
        </Layout>
    )
}

export default Login
