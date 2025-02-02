import React from "react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import AddComment from "../Components/AddComment";
import CommentList from "../Components/CommentList";
import  './CommentList.css';
import { API_URL } from "../Utils";

const BlogDetails = () => {
    const { slug } = useParams();
    // console.log(slug);
    
    const [blog, setBlog] = React.useState();
    const fetchBlog = async () => {
        try{
            const response = await fetch(`${API_URL}blog/${slug}/`)
            const data = await response.json()
            setBlog(data)
        }catch(err){
            console.log(err)
        }
    }

    
    useEffect(() => {   
        fetchBlog();
    }, [])

    return (
        <div className="container mt-3">
            {blog &&   
                <>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">  
                                <img src={`${API_URL}${blog.banner}`} className="card-img-top" alt={blog.title}/>      
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5> 
                                    <h6 className="card-subtitle mb-2 text-muted">Author</h6>
                                    <p className="card-text" dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <AddComment id={blog.id} slug={slug} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <CommentList slug={slug} />  
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Related Posts</h5>
                                    <ul className="list-group">
                                        <li className="list-group-item">Post 1</li>
                                        <li className="list-group-item">Post 2</li>
                                        <li className="list-group-item">Post 3</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                </div>
                </>
            } 
        </div>
    )
}

export default BlogDetails;