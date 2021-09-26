import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import blogsApi from '../apis/blogs'
import PageLoader from '../PageLoader'
import axios from 'axios'
import parse from 'html-react-parser';
import {useHistory} from 'react-router-dom'
import toast from "react-hot-toast";



export default function PreviewBlog(props) {
    const {title,body,bannerImage} = (props.location && props.location.state) || {};
    let history = useHistory()
    const componentMounted = true
    const {id} = useParams()
    const [blogDetails, setBlogDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [blogCreator, setBlogCreator] = useState('')
    const [published, setPublished] = useState(false)
    const [blogPublished, setBlogPublished] = useState({})
    const source = axios.CancelToken.source()

    const fetchBlogDetails = async()=>{
        try{
            const response = await axios.get(`/blogs/${id}/preview`, {cancelToken:source.token})
            setBlogDetails(response.data.blog)
            setBlogCreator(response.data.blog_creator)
            setLoading(false)
            console.log("Preview Blog details",response)
        } catch(error){
            if(axios.isCancel(error)){
                console.log('cancelled')
            }else{
                throw error
            }
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handlePublishedSubmit = async(event) => {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData();
        // formData.append('blog[title]',title)
        // formData.append('blog[body]',body)
        // formData.append('blog[image]',bannerImage)
        formData.append('blog[published]',published)
        try{
            const response = await axios.patch(`/blogs/${id}/published`,formData)
            setLoading(false)
            console.log("blog publish response", response)
            setBlogPublished(response.data.blog)
            if(response){
                response.success = response.status === 200;
                if (response.data.notice){
                    toast.success('Blog Pubished')                    
                }
            }            
            history.push('/blogs');
        } catch(error){
            console.log("blog not published error",error)
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
        }      
    }

    const handlePublish = () => {
        setPublished(true)
    }
    
    useEffect(()=>{
        fetchBlogDetails()
        return () => {
            source.cancel()
        }
    }, [])

    if(loading){
        return <PageLoader />
    }


    return (
        <div className="bg-white">
                
                <div className="max-w-6xl mx-auto mt-10 col-span-2">
                    <div className="relative max-w-4xl mx-auto items-center justify-between">
                        <div className="flex flex-col ">
                            <div className="w-full">
                            <div className="mt-20">
                                <img className="block rounded-full shadow-xl mx-auto -mt-24 h-48 w-48 bg-cover bg-center"
                                src={blogDetails?.image}
                                />                                         
                            </div>

                            <div className="flex items-center justify-center py-1 overflow-hidden">
                                <h2 className="text-gray-700 text-xl font-bold ">
                                    {parse(blogDetails?.title)}
                                </h2>
                                {/* by <span className="text-gray-700 pl-2 text-lg font-bold">{blogCreator?.username}</span> */}
                            </div>


                            <div className="flex items-center justify-center py-1 overflow-hidden">
                                <div 
                                    // dangerouslySetInnerHTML={{ __html: blogDetails.body }}
                                    className="prose-lg">
                                        {parse(blogDetails?.body)}
                                </div>
                            </div>                       
                            </div> 
                            <div className="flex items-center justify-center py-1 overflow-hidden">
                                <button className="group inline-flex justify-center px-4 py-2 text-sm font-medium
                                        text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:bg-blue-400
                                        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" 
                                        onClick={handlePublish}          
                                    >
                                    Publish
                                </button>
                            </div>
                            <div className="flex items-center justify-center py-1 overflow-hidden">
                                <button className="inline-flex justify-center px-4 py-2 text-sm font-medium
                                        text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200
                                        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" 
                                        onClick={handlePublishedSubmit}          
                                    >
                                    Post your blog
                                </button>
                            </div>  
                        </div>
                    </div>
                </div>   
        </div>
    )
}
