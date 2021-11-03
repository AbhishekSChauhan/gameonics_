import axios from 'axios'
import Trix from "trix";
import React, { useEffect, useState } from "react";
import { ReactTrixRTEInput } from "react-trix-rte";
import PageLoader from '../PageLoader'
import CreateForm from './CreateForm'
import toast from "react-hot-toast";
import blogsApi from '../apis/blogs';


export default function CreateBlog({history}) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [loading, setLoading] = useState(false)
    const [bannerImage, setBannerImage] = useState(null)
    const [blogPosted, setBlogPosted] = useState({})
    const [tags, setTags] = useState([])
    const [input, setInput] = useState('')
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    

    const handleBodyChange = (value)=>{
        setBody(value)
        console.log(value)
    }

    const handleTitleChange = (value)=>{
        setTitle(value)
        console.log(value)
    }

    const handleCheckFileSize = e => {
        const elem = e.target;
        if (elem.files[0].size > 1048576) {
            elem.value = '';
            toast.error('Size is more than 1 MB')
        } else 
        { 
            setBannerImage(elem.files[0]); 
        }
    };
    
    
    const handleSubmit = async (event) => {        
        event.preventDefault()
        setLoading(true)
        const formData = new FormData();
        formData.append('blog[title]',title)
        formData.append('blog[body]',body)
        formData.append('blog[image]',bannerImage)
        formData.append('blog[tag_list]',tags)
        try{
            const response = await axios.post("/blogs",formData)            
            console.log("blog submit response", response)
            setBlogPosted(response.data.blog)
            setLoading(false) 
            if(response){
                response.success = response.status === 200;
                if (response.data.notice){
                    toast.success(response.data.notice)                    
                }
            } 
                    
            history.push({
                pathname: `/blogs/${response.data.blog.slug}/preview`,
                state: {slug: response.data.blog.slug
                    }
            });
        } catch(error){
            console.log("blog not saved error",error)
            setLoading(false)
            if(error){
                toast.error(
                    error.response?.data?.notice ||
                    error.response?.data?.error ||
                    error.message ||
                    error.notice ||
                    "Something went wrong!"
                )
            }
            if (error.response?.status === 423) {
                window.location.href = "/";
            }
        }               
    }

    if(loading){
        return <PageLoader />
    }

    return (
        <div>
            <CreateForm 
                title={title}
                body={body}
                setTitle={setTitle}
                blogPosted={blogPosted}
                bannerImage={bannerImage}
                loading={loading}
                handleSubmit={handleSubmit} 
                handleTitleChange= {handleTitleChange} 
                handleBodyChange={handleBodyChange} 
                handleCheckFileSize={handleCheckFileSize}
                tags={tags}
                setTags={setTags}
                isKeyReleased={isKeyReleased}
                setIsKeyReleased={setIsKeyReleased}
                input={input}
                setInput={setInput}
            /> 
       </div>
    )
}
