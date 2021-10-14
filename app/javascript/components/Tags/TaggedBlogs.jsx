import React, { useState, useEffect } from 'react'

const TaggedBlogs = ({tag}) => {
    const [loading, setLoading] = useState(false)
    const [blogs, setBlogs] = useState([])

    const fetchTaggedBlogs = async() => {
        try{
            setLoading(true)
            const response = await axios.get(`tags/${tag}`)
            setBlogs(response.data.blogs)
            console.log('tagged blogs',response)
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
        }              
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
        <div>
            {tag}            
        </div>
    )
}

export default TaggedBlogs
