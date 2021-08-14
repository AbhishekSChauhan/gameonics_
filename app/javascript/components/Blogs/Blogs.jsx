import React, { useEffect, useState } from 'react'
import blogsApi from '../apis/blogs';
import PageLoader from '../PageLoader';
import BlogNav from './BlogNav';
import BlogsDashboard from './BlogsDashboard';
import axios from 'axios'

export default function Blogs({history}) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)
    const source = axios.CancelToken.source()

    const fetchBlogs = async () => {
        try {
            const response = await blogsApi.list({cancelToken:source.token})
            setBlogs(response.data.blogs)

            console.log(response)
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

    const updateBlog = () => {
        history.push(`/blogs/${id}/edit`)
    }

    const destroyBlog = async(id) => {
        try {
            await axios.delete(`/blogs/${id}`);
            await fetchBlogs();
        }catch(error){
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
    return (
        <div>
            <BlogNav />
            <BlogsDashboard 
                data={blogs}
                showBlog={showBlog}
                updateBlog={updateBlog}
                destroyBlog={destroyBlog}
            />            
        </div>
    )
}
