import React from "react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import AddComment from "../Components/AddComment";
import CommentList from "../Components/CommentList";
import BlogTags from "../Components/BlogTags";
import LatestBlog from "../Components/LatestBlog";
import { API_URL } from "../Utils";
import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon} from "react-share"
import { useTranslation } from 'react-i18next';
const BlogDetails = () => {
    const {t} = useTranslation();
    const { slug } = useParams();
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
        document.title = `Blog - ${slug}`;
    }, [slug])

    return (
        <div className="container mt-3">
            {blog &&   
                <>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">  
                                <img src={`${API_URL}${blog.banner}`} className="card-img-top" alt={blog.title}/>
                                <div className="">
                                    <FacebookShareButton
                                        url="#"
                                        style={{marginRight: "3px"}}
                                        hashtag={blog.tag}>
                                        <FacebookIcon logoFillColor="white" size={20}
                                                      round={true} />
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        style={{marginRight: "3px"}}
                                        url="#">
                                        <TwitterIcon logoFillColor="white" size={20} round={true} />
                                    </TwitterShareButton>
                                    <WhatsappShareButton title={blog.title} style={{marginRight: "3px"}}>
                                        <WhatsappIcon ogoFillColor="white" size={20} round={true}/>
                                    </WhatsappShareButton>
                                    <TelegramShareButton url="#"  style={{marginRight: "3px"}}>
                                        <TelegramIcon logoFillColor="white" size={20} round={true} />
                                    </TelegramShareButton>
                                </div>


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
                                    <h5 className="card-title">{t("Latest Posts")}</h5>
                                    <LatestBlog action={fetchBlog}/>
                                </div>
                            </div>

                            <div className="card mt-3">
                                <div className="card-body">
                                    <h5 className="card-title">{t("Categories")}</h5>
                                    <BlogTags onClick={fetchBlog}/>
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