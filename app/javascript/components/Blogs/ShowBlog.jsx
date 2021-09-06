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
            <div className="max-w-6xl mx-auto mt-10">
                <div className="relative max-w-4xl mx-auto items-center justify-between">
                    {/* Card is full width. Use in 12 col grid for best view. */}
                    {/* Card code block start */}
                    <div className="flex flex-col ">
                        <div className="w-full ">
                            <div className="flex items-center justify-center py-1 overflow-hidden">
                                <h2 className="text-gray-700 text-xl font-bold ">
                                    {blogDetails?.title}
                                </h2>
                                by <span className="text-gray-700 pl-2 text-lg font-bold">{blogCreator?.username}</span>
                            </div>


                            <div className="flex items-center justify-center py-1 overflow-hidden">
                                <div 
                                    // dangerouslySetInnerHTML={{ __html: blogDetails.body }}
                                    className="prose-lg">
                                        {parse(blogDetails.body)}
                                </div>
                            </div>
                            <div className="flex ">
                                 
                            </div>
                            
                            
                        </div>  
                    </div>
                    {/* Card code block end */}
                    {/* Comments Block */}
                    <div className="mx-auto py-2 my-10">
                        <Comments blogId={blogDetails?.id} /> 
                    </div>
                </div>
            </div>
        </div>
    )
}
