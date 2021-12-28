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

    const handleSubmit = async (event) => {
        event.preventDefault()
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
            history.push("/blogs")
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
        try {
          const response = await axios.get(`/blogs/${id}`)
          setTitle(response.data.blog.title);
          setBody(response.data.blog.body)
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
                setTitle={setTitle}
                setBody={setBody}
                loading={loading}
                handleSubmit={handleSubmit}            
            />            
        </div>
    )
}
