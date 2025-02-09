import axios from "axios";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../Utils";

const Login = () => {   

    const [loginData, setLoginData] = React.useState({email: '', password: ''})
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(`${API_URL}user/login/`, loginData)
            const data = await response.data;
            console.log(data.email)
            if(data){

                localStorage.setItem('email', data.email)
                localStorage.setItem('id', data.id)
                localStorage.setItem('first_name', data.first_name) 
                localStorage.setItem('last_name', data.last_name)
                localStorage.setItem('avatar', data.avatar)   
                
                navigate("/add")

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
                            Login
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" id="email" value={loginData.email} onChange={(e)=>setLoginData(prevData=>({...prevData,email:e.target.value}))} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" value={loginData.password} onChange={(e)=>setLoginData(prevData=>({...prevData,password:e.target.value}))} />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                                <p className="text-center mt-2">
                                    if you have not account please <a href="/register">Register</a>
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