import React from 'react';
import { API_URL } from '../../Utils';
import axios from "axios";

const UpdatePassword = () =>{

    const [passwordFormData, setPasswordFormData] = React.useState({'oldPassword':'','newPassword':'', confirmPassword:''});

    const updatePassword = async  (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('old_password', passwordFormData.oldPassword);
        formData.set('new_password', passwordFormData.newPassword);
        formData.set('id',localStorage.getItem('id'));
        try{
            const response = await axios.put(`${API_URL}user/updatePassword/`, formData,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            const data = await response.json();
            console.log(data);
        }catch (e) {
            console.log(e);
        }finally {
            passwordFormData.oldPassword ='';
            passwordFormData.newPassword ='';
            passwordFormData.confirmPassword ='';
        }

    }

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h5>Update your password</h5>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={updatePassword}>
                                <div className="form-group mb-3">
                                    <input type="password" className="form-control" id=" "
                                           value={passwordFormData.oldpassword}
                                           onChange={(e)=>setPasswordFormData({...passwordFormData,oldPassword: e.target.value})}
                                           placeholder="Enter your old password"/>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="password" className="form-control" id=" "
                                           value={passwordFormData.newpassword}
                                           onChange={(e)=>setPasswordFormData({...passwordFormData,newPassword: e.target.value})}
                                           placeholder="Enter your new password"/>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="password" className="form-control" id=" "
                                           value={passwordFormData.confirmPassword}
                                           onChange={(e)=>setPasswordFormData({...passwordFormData,confirmPassword: e.target.value})}
                                           placeholder="Confirm your password"/>
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
export default UpdatePassword;