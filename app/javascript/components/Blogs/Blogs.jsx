import React, { useEffect, useState } from 'react'
import blogsApi from '../apis/blogs';
import PageLoader from '../PageLoader';
import BlogNav from './BlogNav';
import BlogsDashboard from './BlogsDashboard';

export default function Blogs({history}) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchBlogs = async () => {
        try {
            const response = await blogsApi.list()
            setBlogs(response.data.blogs)

            console.log(response)
            setLoading(false)
        } catch (error) {
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

    useEffect(()=>{
        fetchBlogs();
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
            />            
        </div>
    )
}
