import React,{useState,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const Spinner = () => {
    const [count,setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((pre)=> --pre)
        }, 1000);
        count === 0 && navigate('/login',{
            state : location.pathname
        });
        return () => clearInterval(interval);
    },[count, navigate])
  return (
    <>
        <div className="d-flex flex-column justify-content-center mt-4 align-items-center" style={{minHeight : "70vh"}}>
            <h2>Redirecting to you in {count} second</h2>
            <div className="spinner-border" role='status'>
                <span className="visually-hidden">Lpading..</span>
            </div>
        </div>
    </>
  )
}

export default Spinner
