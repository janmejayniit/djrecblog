import axios from "axios";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../Utils";
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();

    const [loginData, setLoginData] = React.useState({email: '', password: ''})
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(`${API_URL}user/login/`, loginData)
            const data = await response.data;
            if(data){

                localStorage.setItem('email', data.user.email)
                localStorage.setItem('id', data.user.id)
                localStorage.setItem('first_name', data.user.first_name)
                localStorage.setItem('last_name', data.user.last_name)
                localStorage.setItem('phone_number', data.user.phone_number)
                localStorage.setItem('avatar', data.user.avatar)
                localStorage.setItem('address', data.user.address)
                localStorage.setItem('bio', data.user.bio)
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)

                navigate("/profile")

            }
            
        }catch(error){
            console.log(error)
        }
        finally{
            setLoginData({email: '', password: ''})
        }
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            {t('Login')}
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">{t('Email')}</label>
                                    <input type="text" className="form-control" id="email" value={loginData.email} onChange={(e)=>setLoginData(prevData=>({...prevData,email:e.target.value}))} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">{t('Password')}</label>
                                    <input type="password" className="form-control" id="password" value={loginData.password} onChange={(e)=>setLoginData(prevData=>({...prevData,password:e.target.value}))} />
                                </div>
                                <button type="submit" className="btn btn-dark btn-sm">{t('Login')}</button>
                                <p className="text-center mt-2">
                                    {t('if you have not account please')} <a href="/register">{t('Register')}</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;