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
import {useHistory,Link} from 'react-router-dom'

export default function ShowBlog({user}) {
    const componentMounted = true
    const {slug} = useParams()
    const [blogDetails, setBlogDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [blogCreator, setBlogCreator] = useState('')
    const [allLikes, setAllLikes] = useState([])
    const [bookmark, setBookmark] = useState([])
    const [views, setViews] = useState(0)
    const [tags, setTags] = useState([])
    let history = useHistory()

    const { pathname } = useLocation();

    const source = axios.CancelToken.source()

    const fetchBlogDetails = async()=>{
        try{
            const response = await axios.get(`/blogs/${slug}`, {cancelToken:source.token})
            setBlogDetails(response.data.blog)
            setBlogCreator(response.data.blog_creator)
            setAllLikes(response.data.likes)
            setBookmark(response.data.bookmark)
            setViews(response.data.views)
            setTags(response.data.tags)
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

    const showTaggedBlog = (tag) => {
        history.push(`/tags/${tag}`)
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
                            <div
                                className="text-base font-medium text-gray-500 
                                flex flex-row items-center mr-2">
                            <svg
                                className="w-4 h-4 mr-1 text-lg font-semibold"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                ></path>
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                ></path>
                            </svg>
                            <span>{blogDetails?.views_count}</span>
                            </div>

                            <div>
                                {tags.map((tag)=>(
                                    <button onClick={()=>showTaggedBlog(tag.name)} >
                                        <span className="pl-2 mt-2 mb-2">{tag.name}</span>
                                    </button>
                                ))}
                            </div>
                            
                            <div>
                                by
                                <Link to={`/users/${blogCreator}`}>
                                    {blogCreator}
                                </Link>

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
                        <Comments blog={blogDetails} 
                                user={user} 
                        /> 
                    </div>
                </div>
            </div>
        </div>
    )
}
