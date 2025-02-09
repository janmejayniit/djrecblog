import { React, useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { API_URL } from "../Utils";

const LatestBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const fetchBlogs = async () => {
        const response = await fetch(`${API_URL}blog/latest`);
        const data = await response.json();
        setBlogs(data);
    }
    const handlelatestBlogClick = (slug) => {
        navigate(`/${slug}/`);
    };
    useEffect(() => {
        fetchBlogs();
    }, [handlelatestBlogClick]);


    return (
        <>
            <ul className="list-group list-group-flush">
                {blogs.map((blog) => {
                    return (
                        <li key={blog.id} className="list-group-item">
                            <a href="javascript:;"
                               onClick={() => handlelatestBlogClick(blog.slug)}
                               style={{textDecoration:'none'}}>
                                {blog.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </>
    );


}
export default LatestBlog;