import {React, useState, useEffect} from 'react';
import { API_URL } from '../../Utils';
import axios from "axios";
import './UserProfile.css';

const UpdateProfile = () =>{

    const [user, setUser] = useState({first_name:'', last_name:'', phone_number:'', address:'',bio:'',avatar:''});

    const updateProfileImage = async (e)=> {
        e.preventDefault();
        try{
            const formData = new FormData()
            if (user.avatar) {
                formData.append('avatar', user.avatar);
                formData.append('email', localStorage.getItem('email'));
                const response = await axios.put(`${API_URL}user/updateProfile/`,formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if(response.data){
                    setUser((prev)=>({...prev, avatar:response.data.avatar}));
                    localStorage.setItem('avatar',response.data.avatar)
                }
            } 
        }catch(error){
            console.log(error);
        }
    }


    const updateUser = async(e) =>{
        e.preventDefault();
        try{
            const formData = new FormData()
            formData.append('first_name', user.first_name);
            formData.append('last_name', user.last_name);
            formData.append('phone_number', user.phone_number);
            formData.append('address', user.address);
            formData.append('bio', user.bio);
            formData.append('email', localStorage.getItem('email'));
            

            const response = await axios.put(`${API_URL}user/updateProfile/`,formData);
            console.log(response.data);
            if(response.data){
                setUser(response.data)
                localStorage.setItem('first_name',response.data.first_name)
                localStorage.setItem('last_name',response.data.last_name)
                localStorage.setItem('phone_number',response.data.phone_number)
                localStorage.setItem('address',response.data.address)
                localStorage.setItem('bio',response.data.bio)
            }
        }catch(error){
            console.log(error);
        }    
    }

    useEffect(()=>{
        setUser(
            {
                first_name:localStorage.getItem('first_name')?localStorage.getItem('first_name'):'', 
                last_name:localStorage.getItem('last_name')?localStorage.getItem('last_name'):'',  
                phone_number:localStorage.getItem('phone_number')?localStorage.getItem('phone_number'):'', 
                address:localStorage.getItem('address')?localStorage.getItem('address'):'', 
                bio:localStorage.getItem('bio')?localStorage.getItem('bio'):'', 
                avatar:localStorage.getItem('avatar')?localStorage.getItem('avatar'):'', 
            }
        )
       
    },[])

    return (

        <div className="container mt-3">
            <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="account-settings">
                                <div className="user-profile">
                                    <div className="user-avatar">
                                        
                                    {user.avatar ? (
                                    <img src={`${API_URL}${user.avatar}`} alt="Maxwell Admin" />
                                    ) : (
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
                                    )}
                                    <div className='profile-info'>
                                        <a href="javascript:;" className='edit-icon' data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className='fa fa-pencil'></i> </a>
                                    </div> 
                                    </div>
                                    <h5 className="user-name">{user.first_name} {user.last_name}</h5>
                                    <h6 className="user-email">{user.email}</h6>
                                </div>
                                {user.bio?(
                                    <div className="about">
                                        <h5>About</h5>
                                        <p>{user.bio}</p>
                                    </div>
                                    ):<></>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <form onSubmit={updateUser}>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control" 
                                            value={user.first_name}
                                            onChange={(e)=>setUser((preUser=>({...preUser,first_name: e.target.value})))}
                                            placeholder="First name" aria-label="First name"/>
                                        </div>
                                        <div className="col">
                                            <input type="text" className="form-control" 
                                            value={user.last_name} 
                                            onChange={(e)=>setUser((preUser=>({...preUser,last_name:e.target.value})))}
                                            placeholder="Last name" aria-label="Last name"/>
                                        </div>
                                    </div>
                                </div>
                                            
                                <div className="form-group mb-3">
                                    <input type="tel" className="form-control" id="phone" 
                                    value={user.phone_number} 
                                    onChange={(e)=>setUser(preUser=>({...preUser,phone_number:e.target.value}))}
                                    placeholder="Enter your phone number"/>
                                </div>
                                <div className="form-group mb-3">
                                    <textarea className="form-control" id="address" 
                                    placeholder="Enter your address" 
                                    value={user.address}
                                    onChange={(e)=>setUser(preUser=>({...preUser,address:e.target.value}))}
                                    ></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <textarea className="form-control" id="bio" placeholder="Enter your bio" 
                                    value={user.bio}
                                    onChange={(e)=>setUser(preUser=>({...preUser,bio:e.target.value}))}
                                    ></textarea>
                                </div>
                                {/* <div className="form-group mb-3">
                                    <input type="file" className="form-control" 
                                    id="profilePicture" 
                                    onChange={(e)=>setUser(preUser=> ({...preUser,avatar: e.target.files[0]}))}
                                    placeholder='Profile Picture'/>
                                </div> */}
                                <button type="submit" className="btn btn-dark btn-sm">Update</button>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={updateProfileImage} encType="multipart/form-data">
                            <div className="form-group mb-3">
                                <input type="file" className="form-control" 
                                id="profilePicture" 
                                onChange={(e)=>setUser(preUser=> ({...preUser,avatar: e.target.files[0]}))}
                                placeholder='Profile Picture'/>
                            </div>
                            <button type="submit" className="btn btn-dark btn-sm">Update</button>
                        </form>
                    </div>
                     
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateProfile;