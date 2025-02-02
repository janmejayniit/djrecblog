import React from "react";
import PostCard from "../Components/PostCard";
import { API_URL } from "../Utils";


const Home = () => {
    const [blogs, setBlogs] = React.useState([])

    const fetchBlogs = async () => {
        const response = await fetch(`${API_URL}blog/`)
        const data = await response.json()
        setBlogs(data)
    }

    React.useEffect(() => {
        fetchBlogs();
    }, [])


  return (
    <div className="container mt-3">
        <div className="row">
            <div className="col-md-8">
            {blogs.map((blog) => {
                return  <PostCard id={blog.id} title={blog.title} content={blog.content} banner={blog.banner} created_at={blog.created_at} blog_url={blog.get_absolute_url} />
            })}
            </div>
        </div>
        
    </div>
  );
}


export default Home;