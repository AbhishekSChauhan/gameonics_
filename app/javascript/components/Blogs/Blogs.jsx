import React, { useEffect, useState } from 'react'
import blogsApi from '../apis/blogs';
import PageLoader from '../PageLoader';
import BlogNav from './BlogNav';
import BlogsDashboard from './BlogsDashboard';
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import {useHistory} from 'react-router-dom'


export default function Blogs({user}) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)
    const source = axios.CancelToken.source()
    let history = useHistory()

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
    
    const showBlog = (slug) => {
        history.push(`/blog/${slug}/show`)
    }

    const updateBlog = (slug) => {
        history.push(`/blog/${slug}/edit`)
    }

    const destroyBlog = async(slug) => {
        if (window.confirm(`Are you sure want to delete this blog`)){
            try {
                const response = await axios.delete(`/blog/${slug}`);
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
        <div className="max-w-7xl flex items-center overflow-hidden h-auto flex-wrap mx-auto">
          <div className="w-full rounded-lg shadow-2xl bg-white lg:mx-0">
            <div className="p-4 mx-auto justify-center">              
                <BlogNav user={user} />                
                <BlogsDashboard 
                    data={blogs}
                    showBlog={showBlog}
                    updateBlog={updateBlog}
                    destroyBlog={destroyBlog}
                    />  
            </div>            
           </div>
        </div>
    )
}
