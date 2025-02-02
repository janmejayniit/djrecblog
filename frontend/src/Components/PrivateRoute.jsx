import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = () => {
    const authed = localStorage.getItem('id') 
    return authed ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateRoute;