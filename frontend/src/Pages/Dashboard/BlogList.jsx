import {useEffect, useState} from "react";
import {API_URL} from "../../Utils.jsx";
import PostCard from "../../Components/PostCard.jsx";

const BlogList = ()=>{
    const [blogs, setBlogs] = useState([])

    const fetchBlogs = async () => {
        const user_id = localStorage.getItem("user_id");
        const blogs = await fetchBlogs(`${API_URL}/blogs/user/blogs/${user_id}/`);
        const data = await response.json();
        if(blogs.length > 0){
            setBlogs(data);
        }
    }

    useEffect(()=>{
        fetchBlogs();
    },[])

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    {
                        blogs.length > 0 && blogs.map((blog)=>{
                            return (
                                <PostCard title={blog.title} content={} banner={} created_at={} blog_url={}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BlogList;