import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import { userAPI } from '../../../Apl'
import "./EditProfile.css"
import App from '../../../App';


let cloudAPI = "dyujj6zhw"

function EditProfile() {
    const [image, setImage] = useState("")
    const [userData, setUserData] = useState({})
    const User = useSelector(state => state.user.userToken)
    const navigate = useNavigate()
    if (!User) {
        navigate("/login")
    }
    useEffect(() => {
        Axios.get(`${userAPI}userProfile`, { withCredentials: true }).then((response) => {
            setUserData(response.data.user)

        }).catch(error => {
            console.log(error);
        })
    }, [])


    const handleUpdateProfile = () => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'vkiouzpq');
        let imageUrl = null
        Axios.post(`https://api.cloudinary.com/v1_1/${cloudAPI}/image/upload`, formData).then(response => {
            if (response) {
                imageUrl = response?.data?.secure_url
                console.log(imageUrl);
                Axios.post(`${userAPI}editProfilePhoto`, { image: imageUrl }, { withCredentials: true }).then((res) => {
                    if (res.data.changed) {
                        navigate('/myAccount')
                    } else {
                        navigate('/myAccount')
                    }
                })
            }

        })
    }
    return (
        <>
            <div className="container bootstrap snippets bootdey">
                <h1 className="text-primary">Edit Profile</h1>
                <hr />
                <div className="row">
                    <div className="col-md-3">
                        <div className="text-center">
                            <img src={image ? URL.createObjectURL(image):userData? userData.image:""} alt="avatar" />

                            <input type="file" className="form-control" onChange={(e) => {
                                setImage(e.target.files[0])
                            }} />
                            <button className='custombutton' onClick={handleUpdateProfile}>Update Profile</button>
                        </div>
                    </div>

                    <div className="col-md-9 personal-info">
                        <h3>Personal info</h3>

                        <form className="form-horizontal" role="form">
                            <div className="form-group">
                                <label className="col-lg-3 control-label"> Name :</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" value={userData.Name} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Email:</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" value={userData.email} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <hr  className="mt-5" />
        </>
    )
}

export default EditProfile
