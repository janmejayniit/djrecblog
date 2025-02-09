import React from "react";  
import { Link } from "react-router-dom";

const Header = () => {  
  return (  
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">  
      <div className="container">  
        <Link className="navbar-brand" to="/">Blog</Link>  
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">  
          <span className="navbar-toggler-icon"></span>  
        </button>  
        <div className="collapse navbar-collapse" id="navbarNav">  
          <ul className="navbar-nav ml-auto mt-0 float-end">  
            {
            localStorage.getItem('id') ? 
            <>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">Logout</Link>
              </li>
            </>
            :
            <>
              <li className="nav-item">  
                <Link className="nav-link" to="/login">Login</Link>  
              </li>  
              <li className="nav-item">  
                <Link className="nav-link" to="/register">Register</Link>  
              </li> 
            </>
            }
          </ul>  
        </div>  
      </div>  
    </nav>  
  );  
}   
export default Header;