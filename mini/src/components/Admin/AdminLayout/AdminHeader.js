import React from 'react'
import "./AdminHeader.css"
import {  useNavigate } from "react-router-dom";
import {  useDispatch} from "react-redux"   
import { useCookies } from 'react-cookie'
import {AdminActions} from "../../../store/AdminAthu"


function AdminHeader() {
    const dispatch= useDispatch()
    const [cookie, setCookie, removeCookie] = useCookies(['jwt'])

    const navigate = useNavigate()
    const UserLogout=()=>{
    removeCookie('jwt')
    dispatch(AdminActions.AdminLogout())
      navigate("/admin/AdminLogin") 
     }




  return (
    <div className='navbar'>
    <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
            <button style={{ background: "white" }} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li onClick={()=>{navigate("/admin")}}  className="nav-item">
                        <a   style={{ color: 'white' }} id="home" className="nav-link active" aria-current="page">Home</a>
                    </li>
                  
                </ul>
            </div>
           <button onClick={UserLogout}  type="button" className="btn btn">Logut</button>             
    
            </div>
    </nav>

</div>
  )
}

export default AdminHeader
