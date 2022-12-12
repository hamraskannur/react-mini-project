import React from 'react'
import {  useNavigate } from "react-router-dom";
import {  useSelector,useDispatch} from "react-redux"   
import { useCookies } from 'react-cookie'
import { UserActions } from '../../../store/UserAthu';

import "./Header.css"
function Header() {
    const dispatch= useDispatch()
    const [cookie, setCookie, removeCookie] = useCookies(['jwt'])

    const navigate = useNavigate()
    const  User= useSelector(state=> state.user.userToken)
    const UserLogout=()=>{
    removeCookie('jwt')
    dispatch(UserActions.userLogout())
    navigate("/login") 
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
                            <li onClick={() => { navigate("/") }}  className="nav-item">
                                <a  style={{ color: 'white' }} id="home" className="nav-link active" aria-current="page">Home</a>
                            </li>
                            <li  onClick={() => { navigate("/") }} className="nav-item">
                                <a style={{ color: 'white' }} className="nav-link">Booking</a>
                            </li>
                            <li  onClick={() => { navigate("/") }} className="nav-item">
                                <a style={{ color: 'white' }} className="nav-link">Place</a>
                            </li>
                            <li  onClick={() => { navigate("/") }} className="nav-item">
                                <a style={{ color: 'white' }} className="nav-link" >Foods</a>
                            </li>
                            <li  onClick={() => { navigate("/") }} className="nav-item">
                                <a style={{ color: 'white' }} className="nav-link">Orders</a>
                            </li>
                        </ul>
                    </div>
                    { User &&<button onClick={() => { navigate("/myAccount") }}  type="button" className="btn btn">My Acount</button>}
                    {User? <button onClick={UserLogout}  type="button" className="btn btn">Logut</button> :<button onClick={() => { navigate("/login") }}  type="button" className="btn btn">Login</button>}                
            
                    </div>
            </nav>

        </div>
    )
}

export default Header
