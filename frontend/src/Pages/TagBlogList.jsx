import {React,useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from "../Components/PostCard";
import { API_URL } from "../Utils";

const TagBlogList=()=>{
    const [blogs, setBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const {tag_name} = useParams();

    useEffect(() => {
        fetchBlogs(currentPage);
    }, [currentPage]);

    const fetchBlogs = async (page) => {
        try{
            const response = await axios.get(`${API_URL}blog/tag/${tag_name}?page=${page}`);
            setBlogs(response.data.results);
            const total_pages = response.data.count>10?response.data.count/10:0;
            // console.log(total_pages);
            // setTotalPages(response.data.count);
            setTotalPages(Math.floor(total_pages));
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
export default TagBlogList;