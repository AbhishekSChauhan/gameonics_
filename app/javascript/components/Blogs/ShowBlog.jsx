import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import blogsApi from '../apis/blogs'
import PageLoader from '../PageLoader'
import axios from 'axios'
import { Comments } from '../Comments/Comments'
import parse from 'html-react-parser';

export default function ShowBlog() {
    const componentMounted = true
    const {id} = useParams()
    const [blogDetails, setBlogDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [blogCreator, setBlogCreator] = useState('')

    const source = axios.CancelToken.source()

    const fetchBlogDetails = async()=>{
        try{
            const response = await axios.get(`/blogs/${id}`, {cancelToken:source.token})
            setBlogDetails(response.data.blog)
            setBlogCreator(response.data.blog_creator)
            setLoading(false)
            console.log("Show Blog details",response)
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
    
    const getBodyHTML = (str) => {
        if (str === ''){
            return null;
        } else {
            var htmlContent = document.getElementById('bodyContainer');
            htmlContent.insertAdjacentHTML('afterbegin',str)
        }
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
        // <div>
        //     <div>Title: {blogDetails?.title}</div>
        //     <div>Body: {blogDetails?.body}</div>
        //     <div>Written by {blogCreator?.username}</div>
        //     <Comments blogId={blogDetails?.id} />
        // </div>

        <div className="w-full bg-gray-200 dark:bg-gray-900 py-10">
            <div className="container mx-auto px-6 flex items-start">
                <div className="w-full">
                    {/* Card is full width. Use in 12 col grid for best view. */}
                    {/* Card code block start */}
                    <div className="flex flex-col lg:flex-row mx-auto bg-white dark:bg-gray-800 shadow rounded">
                        <div className="w-full lg:w-1/3 px-12 flex flex-col items-center py-10">
                            <h2 className="text-gray-800 dark:text-gray-100 text-xl tracking-normal font-medium mb-1">
                                {blogDetails?.title}
                            </h2>
                            <div className="flex text-gray-600 dark:text-gray-100 text-sm tracking-normal font-normal mb-3 ">
                                <span>by {blogCreator?.username}</span> 
                            </div>
                            <div id='bodyContainer'
                            // dangerouslySetInnerHTML={{ __html: blogDetails?.body}}
                                className="text-gray-600 dark:text-gray-100 text-sm tracking-normal font-normal mb-8  w-10/12">
                                    {getBodyHTML(blogDetails.body)}
                            </div>
                            
                        </div>  
                    </div>
                    {/* Card code block end */}
                </div>
            </div>
            <div className="w-full lg:w-1/3 flex-col flex justify-center items-center mt-5 px-12 py-8">
                <div className="container mx-auto px-6 flex items-start justify-center">
                    <div className="w-full">
                    <div className="flex flex-col lg:flex-row mx-auto bg-white dark:bg-gray-800 shadow rounded">
                        <div className="w-full px-12 flex flex-col items-center py-10">
                            <Comments blogId={blogDetails?.id} /> 
                        </div>
                    </div>
                    </div>
                </div>                                              
            </div>
        </div>
    )
}
