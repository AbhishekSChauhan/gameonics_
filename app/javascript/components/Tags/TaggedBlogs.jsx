import axios from 'axios'
import React, { useState, useEffect } from 'react'
import PageLoader from '../PageLoader'
import { useParams } from 'react-router-dom'
import TaggedBlogsList from './TaggedBlogsList'
import {useHistory} from 'react-router-dom'

const TaggedBlogs = () => {
    const [loading, setLoading] = useState(false)
    const [blogs, setBlogs] = useState([])
    const {tag} = useParams()
    let history = useHistory()


    const fetchTaggedBlogs = async() => {
        try{
            setLoading(true)
            const response = await axios.get(`/tags/${tag}`)
            setBlogs(response.data.blogs)
            console.log('tagged blogs',response)
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
        }              
    }

    const showBlog = (id) => {
        history.push(`/blogs/${id}/show`)
    }

    useEffect(()=>{
        fetchTaggedBlogs();
    },[])

    if (loading){
        return (
            <div>
                <PageLoader />
            </div>
        )
    }

    return (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto mt-10">
                <h2>{tag} related articles</h2>
                <TaggedBlogsList
                    data={blogs}
                    showBlog={showBlog}
                />
            </div>
        </div>
    )
}

export default TaggedBlogs
