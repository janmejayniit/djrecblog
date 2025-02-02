import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../Utils";

const AddComment = ({id, slug}) => {

    const [comment, setComment] = useState();
    const user_id = localStorage.getItem('id');

    const handleSubmit = async (e) => {

        e.preventDefault();
        try{
            const response = await axios.post(`${API_URL}blog/comment/add/${slug}`, {   
                content: comment, user:user_id, post:id
            })  
            console.log(response.data);
        }catch(err){
            console.log(err);   
        }finally{
            setComment('');
        }   
    }

    return (
        <div>
            <div className="card mt-3">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Comment</label>
                            <textarea className="form-control form-control-sm" value={comment} rows="2" onChange={(e)=>setComment(e.target.value)}></textarea>
                        </div>
                        { localStorage.getItem('id') ? <button type="submit" className="btn btn-primary btn-sm">Submit</button> : <p className="text-danger text-center"><Link to="/login">Please login to comment</Link></p>}    
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddComment;