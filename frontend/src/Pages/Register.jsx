import React from "react";
import { API_URL } from "../Utils";
import { useTranslation } from 'react-i18next';

const Register = () => {
    const { t } = useTranslation();

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
                            {("Register")}
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="form-group mb-3">
                                    <label htmlFor="first_name">{t("First Name")}</label>
                                    <input type="text" className="form-control" id="first_name" value={registerData.first_name} onChange={(e)=>setRegisterData(prevData => ({...prevData,first_name: e.target.value}))}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="last_name">{t("Last Name")}</label>
                                    <input type="text" className="form-control" id="last_name" value={registerData.last_name} onChange={(e)=>setRegisterData(prevData => ({...prevData,last_name: e.target.value}))}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">{t("Email")}</label>
                                    <input type="email" className="form-control" id="email" value={registerData.email} onChange={(e)=>setRegisterData(prevData => ({...prevData,email: e.target.value}))}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">{t("Password")}</label>
                                    <input type="password" className="form-control" id="password" value={registerData.password} onChange={(e)=>setRegisterData(prevData => ({...prevData,password: e.target.value}))} />
                                </div>
                                <button type="submit" className="btn btn-dark btn-sm">{t("Register")}</button>
                                <p className="text-center mt-2">
                                    {t("if you have already account please")} <a href="/login">{t("Login")}</a>
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