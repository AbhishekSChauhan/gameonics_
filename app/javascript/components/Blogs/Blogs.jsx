import React, { useEffect, useState } from 'react'
import blogsApi from '../apis/blogs';
import PageLoader from '../PageLoader';
import BlogNav from './BlogNav';
import BlogsDashboard from './BlogsDashboard';
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";

export default function Blogs({history}) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)
    const source = axios.CancelToken.source()

    const fetchBlogs = async () => {
        try {
            const response = await blogsApi.list({cancelToken:source.token})
            setBlogs(response.data.blogs)

            console.log("Blogs",response)
            setLoading(false)
        } catch (error) {
            if(axios.isCancel(error)){
                console.log('cancelled')
            }else{
                throw error
            }
            console.log(error)
            setLoading(false)
        }
    }
    
    const showBlog = (id) => {
        history.push(`/blogs/${id}/show`)
    }

    const updateBlog = (id) => {
        history.push(`/blogs/${id}/edit`)
    }

    const destroyBlog = async(id) => {
        try {
            const response = await axios.delete(`/blogs/${id}`);
            if(response){
                response.success = response.status === 200;
                if (response.data.notice){
                    toast.success(response.data.notice)                  
                }
            }
            await fetchBlogs();
        }catch(error){
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
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchBlogs();
        return () => {
            source.cancel()
        }
    },[])

    if (loading){
        return (
            <div>
                <PageLoader />
            </div>
        )
    }

    // const blogComponent = blogs.map((blog)=>{
    //     return <BlogsDashboard 
    //             blog={blog}
    //             showBlog={showBlog}
    //             updateBlog={updateBlog}
    //             destroyBlog={destroyBlog}
    //             key={blog.id}
    //             />  
    // })

    return (
        <div>
            <BlogNav />
            <div>
            <BlogsDashboard 
                data={blogs}
                showBlog={showBlog}
                updateBlog={updateBlog}
                destroyBlog={destroyBlog}
                />  
            </div>            
        </div>
    )
}
