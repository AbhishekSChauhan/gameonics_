import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import blogsApi from '../apis/blogs'
import PageLoader from '../PageLoader'
import axios from 'axios'
import { Comments } from '../Comments/Comments'
import parse from 'html-react-parser';
import Likes from '../Likes/Likes'
import Bookmarks from '../Bookmarks/Bookmarks'
import { useLocation } from "react-router-dom";

export default function ShowBlog({user}) {
    const componentMounted = true
    const {id} = useParams()
    const [blogDetails, setBlogDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [blogCreator, setBlogCreator] = useState('')
    const [allLikes, setAllLikes] = useState([])
    const [bookmark, setBookmark] = useState([])
    const { pathname } = useLocation();

    const source = axios.CancelToken.source()

    const fetchBlogDetails = async()=>{
        try{
            const response = await axios.get(`/blogs/${id}`, {cancelToken:source.token})
            setBlogDetails(response.data.blog)
            setBlogCreator(response.data.blog_creator)
            setAllLikes(response.data.likes)
            setBookmark(response.data.bookmark)
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
        // window.scrollTo(0,0)
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
        return () => {
            source.cancel()
        }

    }, [pathname])

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
                            <div className="flex flex-row items-center justify-center py-1 overflow-hidden">
                                <div className="prose-lg">
                                    {parse(blogDetails?.title)}
                                </div>
                                <div>
                                    <Bookmarks 
                                        blog={blogDetails}
                                        user={user} 
                                        bookmark={bookmark}
                                        setBookmark={setBookmark}
                                    />
                                </div>
                                
                            </div>

                            <div>
                                by {blogCreator}
                            </div>

                            <div className="flex items-center justify-center py-1 overflow-hidden">
                                <img className="block shadow-xl mx-auto h-96 w-full bg-cover bg-center"
                                    src={blogDetails?.image} /> 
                            </div>


                            <div className="flex items-center justify-center py-1 overflow-hidden">
                                <div className="prose-lg">
                                    {parse(blogDetails.body)}
                                </div>
                            </div>
                            <div className="flex ">    
                                <Likes 
                                    blog={blogDetails}
                                    user={user} 
                                    allLikes={allLikes}
                                    setAllLikes={setAllLikes}
                                />
                            </div>
                            
                            
                        </div>  
                    </div>
                    {/* Card code block end */}
                    {/* Comments Block */}
                    <div className="mx-auto py-2 my-10">
                        <Comments blogId={blogDetails?.id} 
                                user={user} 
                        /> 
                    </div>
                </div>
            </div>
        </div>
    )
}
