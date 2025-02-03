import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../Utils";

const LatestBlog = ({action}) => {
  const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await fetch(`${API_URL}blog/latest`);
        const data = await response.json();
        setBlogs(data);
        }
    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <>
            <ul className="list-group list-group-flush">
                {blogs.map((blog) => {
                    return (
                        <li key={blog.id} className="list-group-item">
                            <Link to={`/${blog.slug}/`} onClick={action}>{blog.title}</Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );


}
export default LatestBlog;