import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { AdminAPI } from '../../../Apl'
import EditProfile from '../../User/EditProfile/EditProfile'
import Adminpop from '../Adminpop.js/Adminpop'
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom'

function AdminTable() {
    const [userData, setUserData] = useState([])
    const [SearchInput, setSearchInput] = useState("")
    const [deleteuser,setdeleteuser]=useState(0)
    const navigate = useNavigate()  
    useEffect(() => {
        Axios.get(`${AdminAPI}getUserDetails`, { withCredentials: true }).then((response) => {
            setUserData(response.data.data)
        }).catch(error => {
            console.log(error);
        })
    },[deleteuser===1])

    const DeleteUser = (id) => {
        
        Axios.get(`${AdminAPI}DeleteUser/${id}`, { withCredentials: true }).then((response) => {
            setUserData(response.data.data)

        }).catch(error => {
            console.log(error);
        })
        setdeleteuser(1)
    }
   const EditeUser=(userId,username,email)=>{
    navigate('/admin/EditeUser', { state: { _id: userId, name: username, email: email } })
    
   }



    const handleChange = (event) => {
        setSearchInput(event.target.value)
        setdeleteuser(0)
       if(SearchInput){
        let uppdateUse=userData.filter((item)=>item.Name.toLowerCase().indexOf(SearchInput.toLowerCase()) !== -1  )
        setUserData(uppdateUse)
       }else{
        setdeleteuser(1)
       }
     
    }

    return (
        <div>
            <Container>
                <input
                className='mt-5'
                    type="text"
                    placeholder="Search here"
                    onChange={handleChange}
                    value={SearchInput}
                />
                <Table className="mt-3" striped bordered hover>
                    <thead>
                        <tr>
                            <th>number</th>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((obj, index) => {
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{obj.Name}</td>
                                    <td>{obj.email}</td>
                                    <td>
                                        <Button onClick={() => EditeUser(obj._id,obj.Name,obj.email)} variant="primary">Edit</Button>
                                    </td>
                                    <td>
                                        <Button onClick={() => DeleteUser(obj._id)}  variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    )



}

export default AdminTable

