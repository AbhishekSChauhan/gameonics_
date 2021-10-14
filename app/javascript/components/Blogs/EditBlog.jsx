import axios from 'axios'
import React, { useState, useEffect } from 'react'
import PageLoader from '../PageLoader'
import CreateForm from './CreateForm'
import toast, { Toaster } from "react-hot-toast";
import { useParams } from 'react-router-dom'

export default function EditBlog({history}) {
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [loading, setLoading] = useState(false)
    const [isPublished, setIsPublished] = useState(false)
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try{
            const response = await axios.put(`/blogs/${id}`,{
                blog:{
                    title,
                    body,
                }
            })
            setLoading(false)
            if(response){
                response.success = response.status === 200;
                if (response.data.notice){
                    toast.success(response.data.notice)                    
                }
            }
            console.log('edit submit response',response)
            // if(isPublished){
            //     history.push('/blogs')
            // } else {
                history.push({
                    pathname: `/blogs/${id}/preview`,
                    // state: {title: title,
                    //         body:body,
                    //         bannerImage:bannerImage
                    //     }
                });
            // }            
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

    const fetchBlogDetails = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`/blogs/${id}`)
          setTitle(response.data.blog.title);
          setBody(response.data.blog.body)
          if(response.data.blog.published === true){
              setIsPublished(true)
          }
          console.log('edit fetch response',response)

          setLoading(false)
        } catch (error) {
          console.log('fetchBlog Error',error)
        }
      };
    
      const loadData = async () => {
        await fetchBlogDetails();
      };
    
      useEffect(() => {
        loadData();
      }, []);


    if(loading){
        return <PageLoader />
    }

    return (
        <div>
            <CreateForm 
                type="update"
                title={title}
                body={body}
                loading={loading}
                handleSubmit={handleSubmit} 
                handleTitleChange = {handleTitleChange} 
                handleBodyChange = {handleBodyChange} 
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
