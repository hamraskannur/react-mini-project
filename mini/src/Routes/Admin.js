import React,{useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AdminLoginPage from '../page/Admin/AdminLogin'
import { useSelector, useDispatch } from "react-redux"
import { useCookies } from 'react-cookie'
import {AdminActions} from "../store/AdminAthu"
import AdminHome from '../page/Admin/AdminHome'
import AdminEditUser from '../components/Admin/AdminEditUser/AdminEditUser'
import AdminEdite from '../page/Admin/AdminEdite'
function Admin() {

  const [cookies, setCookie] = useCookies(['jwt']);
  let Admin = useSelector(state => { return state.Admin.AdminToken })
    const dispatch = useDispatch()


    useEffect(() => {
      if (Object.keys(cookies).length > 0) {
        console.log(cookies.jwt.Admintoken);
        dispatch(AdminActions.AddAdmin({token: cookies?.jwt?.Admintoken}))
      }
    }, [])
    

  return (
    <div>
      <Routes>
        <Route path="/" element={Admin? <AdminHome/> :<AdminLoginPage/>} />
      </Routes>
      <Routes>
        <Route path="/AdminLogin" element={Admin? <AdminHome/> :<AdminLoginPage/>} />
      </Routes>
      <Routes>
        <Route path="/EditeUser"  element={Admin? <AdminEdite/> :<AdminLoginPage/>}/>
       
      </Routes>

    </div>
  )
}

export default Admin
