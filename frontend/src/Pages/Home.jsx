import { useState, useEffect } from "react";
import React  from "react";
import PostCard from "../Components/PostCard";
import { API_URL } from "../Utils";
import axios from "axios";


const Home = () => {
    const [blogs, setBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchBlogs(currentPage);
    }, [currentPage]);

    const fetchBlogs = async (page) => {
        // const response = await fetch(`${API_URL}blog/`)
        // const data = await response.json()
        // setBlogs(data)
        try{
            const response = await axios.get(`${API_URL}blog/?page=${page}`);
            setBlogs(response.data.results);
            // setTotalPages(response.data.count);
            setTotalPages(10);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // useEffect(() => {
    //     fetchBlogs(1);
    // }, [])


  return (
    <div className="container mt-3">
        <div className="row">
            <div className="col-md-8">
            {blogs.map((blog) => {
                return  <PostCard id={blog.id} title={blog.title} content={blog.content} banner={blog.banner} created_at={blog.created_at} blog_url={blog.get_absolute_url} />
            })}
            </div>
            <div>
                {[...Array(totalPages).keys()].map((number) => (
                <button className="btn btn-dark btn-sm" style={{marginRight:'2px', borderRadius:'0px'}}
                    key={number + 1}
                    onClick={() => handlePageChange(number + 1)}
                    disabled={currentPage === number + 1}
                >
                    {number + 1}
                </button>
                ))}
            </div>
        </div>
        
    </div>
  );
}


export default Home;