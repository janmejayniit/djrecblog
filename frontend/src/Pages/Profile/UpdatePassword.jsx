import React from 'react';

const UpdatePassword = () =>{
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
                            <form>
                                <div className="form-group mb-3">
                                    <input type="password" className="form-control" id="phone" placeholder="Enter your old password"/>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="password" className="form-control" id="phone" placeholder="Enter your new password"/>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="password" className="form-control" id="phone" placeholder="Confirm your password"/>
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