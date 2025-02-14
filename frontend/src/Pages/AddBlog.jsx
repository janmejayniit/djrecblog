import {React, useState} from "react"
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic, Link ,Indent, 
    IndentBlock, BlockQuote, Font, FontFamily, Strikethrough, Subscript, Superscript, Code,
    Heading,FontSize, List, ListProperties, MediaEmbed} from 'ckeditor5';

import { useTranslation } from 'react-i18next';

const AddBlog = () => {
    const {t}= useTranslation();

    const [blogForm, setBlogForm] = useState({'title':'', 'tags':'', 'content':'', 'banner':'','user':''}); 

    const handleFormChange = async (e) => {
        e.preventDefault();

        // if (!blogForm.title || !blogForm.slug) {
        //     alert('Please fill out all required fields');
        //     return;
        // }


        const url = 'http://127.0.0.1:8000/blog/add/';
        const formData = new FormData();
    
        // Append all the form data, including the file
        formData.append('title', blogForm.title);
        formData.append('tags', blogForm.tags);
        formData.append('content', blogForm.content);
        formData.append('user', localStorage.getItem('id'));
        if (blogForm.banner) {
            formData.append('banner', blogForm.banner);
        }
    
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setBlogForm({'title':'', 'tags':'', 'content':'', 'banner':''});
            document.querySelector('input[type="file"]').value = '';
        }

    }


    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleFormChange}>     
                        <div className="mb-3">
                            <label className="form-label">{t("Title")}</label>
                            <input type="text" className="form-control" value={blogForm.title} onChange={(e)=>setBlogForm(prevblogForm => ({...prevblogForm,title: e.target.value}))} />     
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">{t("Banner")}</label>
                            <input type="file" className="form-control" onChange={(e)=>setBlogForm(prevblogForm=> ({...prevblogForm,banner: e.target.files[0]}))}/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">{t("Tags")}</label>
                            <input type="text" className="form-control" value={blogForm.tags} onChange={(e)=>setBlogForm(prevblogForm=> ({...prevblogForm,tags: e.target.value}))}/>
                        </div>
                         
                        <div className="mb-3">
                        <label className="form-label">{t("Content")}</label>
                        <CKEditor
                            editor={ ClassicEditor }
                            config={ {
                                licenseKey: 'GPL',
                                plugins: [ Essentials, Paragraph, Bold, Italic , Strikethrough, Subscript, Superscript, Code, Indent, IndentBlock, BlockQuote, Font, FontFamily, Heading, FontSize,List, ListProperties,MediaEmbed, Link],
                                toolbar: {
                                    items: [
                                        'undo', 'redo',
                                        '|',
                                        'heading',
                                        '|',
                                        'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                                        '|',
                                        'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                                        '|',
                                        'link', 'uploadImage', 'blockQuote', 'codeBlock',
                                        '|',
                                        'alignment',
                                        '|',
                                        'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
                                        '|',
                                        'mediaEmbed','link',
                                    ],
                                    // shouldNotGroupWhenFull: true
                                }
                            } }
                            data={blogForm.content}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const content = editor.getData();
                                setBlogForm(prevBlogForm => ({ ...prevBlogForm, content }));
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                        </div>
                        

                        
                        <button type="submit" className="btn btn-dark btn-sm">{t("Submit")}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddBlog;