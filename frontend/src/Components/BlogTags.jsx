import {React, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../Utils';

const BlogTags = () => {
    const [tags, setTags] = useState([])
    const navigate = useNavigate();
    const fetchTags = async () => {
        const response = await fetch(`${API_URL}blog/tags/`)
        const data = await response.json()
        setTags(data)
    }
    useEffect(() => {
        fetchTags();
    }, [])

    const handleTagClick = (tag) => {
        navigate(`/tag/${tag}/`);
    };

    return (
        <div>
            {tags && tags.map((tag) => (
                <button
                    key={tag}
                    className="badge bg-primary"
                    style={{ marginRight: '2px', textDecoration: 'none' }}
                    onClick={() => handleTagClick(tag)}
                >
                    {tag}
                </button>
            ))}
        </div>
    )
}
export default BlogTags;