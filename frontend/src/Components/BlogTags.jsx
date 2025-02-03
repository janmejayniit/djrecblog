import {React, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../Utils';

const BlogTags = () => {
    const [tags, setTags] = useState([])
    const fetchTags = async () => {
        const response = await fetch(`${API_URL}blog/tags/`)
        const data = await response.json()
        setTags(data)
    }
    useEffect(() => {
        fetchTags();
    }, [])  

    return (
        <div>
            {tags && tags.map((tag) => {
                return<Link to={`/blog/tag/${tag}/`} className="badge bg-primary" style={{marginRight:'2px',textDecoration:'none'}}>{tag}</Link>
            })}           
        </div>
    )
}
export default BlogTags;