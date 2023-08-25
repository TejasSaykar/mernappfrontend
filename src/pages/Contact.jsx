import React from 'react'
import Layout from '../components/Layout/Layout'
import { Table } from 'react-bootstrap'
import {BiSolidPhoneCall} from 'react-icons/bi'
import {HiMail} from 'react-icons/hi'
import {ImHeadphones} from 'react-icons/im'



const Contact = () => {
  return (
    <Layout title="Contact us">
      <div className="container">
        <div className="row my-3">
          <h2 className='text-center text-danger py-2'>Contact Us</h2>
          <Table className='w-75 m-auto'>
            <thead>
              <tr>
                <th className='text-center bg-dark text-light'>Contact Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><ImHeadphones className='m-2' size={27} color='red'/>1800-00-0000(Toll Free)</td>
              </tr>
              <tr>
                <td><HiMail className='m-2' color='skyblue' size={30}/>help@sayComm.com</td>
              </tr>
              <tr>
                <td><BiSolidPhoneCall className='m-2' color='green' size={30}/>1234567890</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
