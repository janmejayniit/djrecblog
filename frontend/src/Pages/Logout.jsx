import React from "react";

const Logout = () => {
    localStorage.clear();
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                              <h4 className="text-center">You have Logout Successfully</h4>
                              <p className="text-center">
                                <a href="/login" className="">Login again</a>
                              </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logout;