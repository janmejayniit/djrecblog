import React from "react";
import format from 'date-fns/format';
import './PostCard.css';
import { API_URL } from "../Utils";
import { Link } from "react-router-dom";

const PostCard = ({title, slug, content, banner, created_at, blog_url}) => {  
    const bannerUrl = `${API_URL}${banner}`;  
    return (
        <>
            {/* <div className="card mt-2"> 
                
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                                <img src={bannerUrl} className="card-img-top" alt={title} />
                        </div>
                        <div className="col-md-8">
                            <h5 className="card-title"><a href={blog_url}>{title}</a></h5> 
                            <h6 className="card-subtitle mb-2 text-muted">Author</h6>
                            <p className="card-text truncated-text">{content}</p>
                        </div>
                    </div>
                    
                </div>
                <div className="card-footer">
                    <a href="" className="btn btn-default btn-sm"><i class="bi bi-heart"></i>0</a>
                    <a href="" className="btn btn-default btn-sm"><i class="bi bi-hand-thumbs-up"></i>0</a>
                    <a href="" className="btn btn-default btn-sm"><i class="bi bi-hand-thumbs-down"></i>0</a>
                    <div className="float-end">
                        <small className="text-muted">{format(created_at, 'yyyy-mm-dd hh:mm:ss')}</small>
                    </div>
                </div>
            </div> */}



            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src={bannerUrl} className="card-img-top" alt={title} />
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title"><Link to={`/${blog_url}`}>{title}</Link></h5>
                        <p class="card-text truncated-text" >
                            {content}
                        </p>
                        <p class="card-text text-sm"><small class="text-body-secondary">{format(created_at, 'yyyy-mm-dd hh:mm:ss')}</small></p>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )    
}

export default PostCard;