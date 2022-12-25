import React,{useEffect,useRef,useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AdminAPI } from '../../../Apl';


function AdminEditUser() {
    const navigate = useNavigate()
    const [Errmessage,setErrmessage]=useState('')
    const location = useLocation()
    const EditeEmail=useRef()
    const EditeName=useRef()
    const userId = location.state._id
    const userName = location.state.name
    const userEmail = location.state.email
    const submitHandle=()=>{
        const UserEditeEmail = EditeEmail.current.value
        const UserEditeName = EditeName.current.value
        console.log(UserEditeEmail);
        if(UserEditeName!=="" &&  UserEditeEmail!=="" && UserEditeEmail.includes('@')){
        axios.post(`${AdminAPI}EditeUser`,{UserEditeEmail,UserEditeName,userId},{withCredentials:true}).then((response)=>{
            console.log(response.data);
            const result = response.data  
            console.log("okok");
            console.log(result);  
            if(result.EditeUser){
                navigate("/admin")
            }else{
                setErrmessage(result.message)
            }

          })
        }else{
            setErrmessage("Email or UserName wrong")

        }
    }
   
    return (
        <div >
            <div className="container ">
                    <h1 className="fw-bold mb-5 text-center">Edit Details</h1>

                    <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example1"> name</label>
                        <input name="Name" type="text" id="username" ref={EditeName} defaultValue={userName} className="form-control"  />
                    </div>
                    <div className="form-outline mb-4 mt-5">
                        <label className="form-label" for="form2Example1">Email address</label>
                        <input type="email" id="userEmail" className="form-control" ref={EditeEmail} defaultValue={userEmail} name="Email"  />
                    </div>

                    <div className="text-center">
                        <small className="text-danger"></small>
                    </div>
                    <div className="text-center">
                        <button id="btn-submit" type="button" onClick={submitHandle} className="btn btn-primary btn-block mb-4">Edit Details</button>
                    </div>
                    {Errmessage.length > 0 && <a style={{ color: 'red' }}  >{Errmessage}</a>}

            </div>

        </div>
    )
}

export default AdminEditUser
