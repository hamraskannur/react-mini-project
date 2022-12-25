import React,{useEffect, useState} from 'react'
import { useSelector} from "react-redux"
import {  useNavigate } from "react-router-dom";
import Axios from 'axios'
import { userAPI } from '../../../Apl'


import "./MyAccount.css"
function MyAccount() {
    const navigate = useNavigate()
    const [UserData,setUserData]=useState({})

    const  User= useSelector(state=> state.user.userToken)
    if(!User){
        navigate("/")
    }
   useEffect(()=>{
        Axios.get(`${userAPI}userProfile`, { withCredentials: true }).then((response) => {
            setUserData(response.data.user)
        }).catch(error=>{
            console.log(error);
        })
   },[])


    return (
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center ">
        <div className="card p-4">
            <div className=" image d-flex flex-column justify-content-center align-items-center">
                <button className="btn btn-secondary mt-5">
                    <img className='profileIMage' src={UserData?UserData.image:"./pic.1.png"} onClick={() => { navigate("/editeAccount") }}  height="100" width="100" /></button>
                <span className="name mt-3">{UserData?UserData.Name:""}</span>
                <span className="idd">{UserData?UserData.email:""}</span>
                <div className=" d-flex mt-2">
                    <button className="btn1 btn-dark" onClick={() => { navigate("/editeAccount") }}  >Edit Profile</button>
                </div>
                <div className="gap-5 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                    <span><i className="bi bi-twitter"></i></span>
                    <span><i className="bi bi-facebook"></i></span>
                    <span> <i className="bi bi-instagram"></i></span>
                    <span><i className="bi bi-linkedin"></i></span>
                </div> <div className=" px-2 rounded mt-4 date ">
                </div>
            </div>
        </div>
    </div>
    )
}

export default MyAccount
