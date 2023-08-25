import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group p-0 m-0">
                    <h4 style={{backgroundColor : "rgb(235, 26, 61)", padding : "10px", color: "white"}}>Admin Panel</h4>
                    <NavLink
                        to="/dashboard/admin/create-category"
                        className="list-group-item list-group-item-action"
                        
                    >
                        Create Category
                    </NavLink>

                    <NavLink
                        to="/dashboard/admin/create-product"
                        className="list-group-item list-group-item-action" 

                    >
                        Create Product
                    </NavLink>

                    <NavLink
                        to="/dashboard/admin/products"
                        className="list-group-item list-group-item-action" 

                    >
                        Products
                    </NavLink>

                    <NavLink
                        to="/dashboard/admin/orders"
                        className="list-group-item list-group-item-action"
                    >
                        Orders
                    </NavLink>
{/* 

                    <NavLink
                        to="/dashboard/admin/users"
                        className="list-group-item list-group-item-action"
                    >
                        Users
                    </NavLink> */}


                </div>
            </div>
        </>
    )
}

export default AdminMenu
