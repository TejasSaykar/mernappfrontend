import React from 'react'
import { Link } from 'react-router-dom'
import { useMode } from '../../Context/darkMode'

const Footer = () => {
    const {mode} = useMode();
    return (
        <div className='footer' style={{backgroundColor : mode === 'light' ? 'rgb(235, 26, 61)' : "black"}}>
            <h4 className='text-center'>All Rights Reserved &copy; SayTech</h4>
            <p className='text-center mt-3'>
                <Link to="/about">About</Link>
                |
                <Link to="/contact">Contact</Link>
                |
                <Link to="/policy">Policy</Link>
            </p>
        </div>
    )
}

export default Footer
