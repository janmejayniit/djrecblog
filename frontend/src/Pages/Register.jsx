import React from "react";
import { API_URL } from "../Utils";

const Register = () => {   

    const [registerData, setRegisterData] = React.useState({first_name: '', last_name: '', email: '', password: ''})

    const handleRegister = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch(`${API_URL}/user/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            })
        }catch(error){
            console.log(error)
        }
        finally{
            setRegisterData({first_name: '', last_name: '', email: '', password: ''})
        }
    }



    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            Register
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="form-group mb-3">
                                    <label htmlFor="first_name">First Name</label>
                                    <input type="text" className="form-control" id="first_name" value={registerData.first_name} onChange={(e)=>setRegisterData(prevData => ({...prevData,first_name: e.target.value}))}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input type="text" className="form-control" id="last_name" value={registerData.last_name} onChange={(e)=>setRegisterData(prevData => ({...prevData,last_name: e.target.value}))}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" value={registerData.email} onChange={(e)=>setRegisterData(prevData => ({...prevData,email: e.target.value}))}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" value={registerData.password} onChange={(e)=>setRegisterData(prevData => ({...prevData,password: e.target.value}))} />
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                                <p className="text-center mt-2">
                                    if you have already account please <a href="/login">Login</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;