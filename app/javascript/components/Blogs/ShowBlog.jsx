import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import blogsApi from '../apis/blogs'
import PageLoader from '../PageLoader'
import axios from 'axios'
import { Comments } from '../Comments/Comments'
import parse from 'html-react-parser';
import Likes from '../Likes/Likes'
import Bookmarks from '../Bookmarks/Bookmarks'
import Share from '../Share/Share'
import { useLocation } from "react-router-dom";
import {useHistory,Link} from 'react-router-dom'
import HelmetMetaData from '../Share/HelmetMetaData'
import { FaUser } from 'react-icons/fa'
import { GrView } from "react-icons/gr";

export default function ShowBlog({user}) {
    // user is selected user or the logged in user
    const componentMounted = true
    const {slug} = useParams()
    const [blogDetails, setBlogDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [blogCreator, setBlogCreator] = useState('')
    const [allLikes, setAllLikes] = useState([])
    const [bookmark, setBookmark] = useState([])
    const [views, setViews] = useState(0)
    const [tags, setTags] = useState([])
    const [authorImg, setAuthorImg] = useState()
    const [isScrolled, setIsScrolled] = useState(false)
    let history = useHistory()

    const { pathname } = useLocation();

    const source = axios.CancelToken.source()

    const fetchBlogDetails = async()=>{
        try{
            const response = await axios.get(`/blogs/${slug}`, {cancelToken:source.token})
            setBlogDetails(response.data.blog)
            setBlogCreator(response.data.blog_creator)
            setAuthorImg(response.data.blog_creator_img)
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
        console.log('url location', window.location.href)
        const showSideBarContents = () => {
            if(window.pageYOffset > 50 ) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll",showSideBarContents)

        return () => window.removeEventListener("scroll",showSideBarContents)

    }, [pathname])

    if(loading){
        return <PageLoader />
    }

    const showTaggedBlog = (tag) => {
        history.push(`/tags/${tag}`)
    }


    return (
        <div className="bg-white mx-6 relative">
            <div className="flex flex-row text-justify max-w-7xl mx-auto mt-5 sm:mt-6 static">
                {/* Left Side Bar */}
                <div className="lg:visible lg:mt-12 fixed bg-white lg:max-w-2xl lg:justify-center lg:mx-10 z-10 lg:z-0 bottom-0 lg:top-36 sm:mx-4 md:mx-3"> 
                    {isScrolled && (
                    <div className="flex flex-row lg:flex-col lg:items-center mx-auto mb-1.5">                              
                        <div className="flex mr-2 lg:my-1 sm:ml-5 sm:mt-1.5 mt-1 ">    
                            <Likes 
                                blog={blogDetails}
                                user={user} 
                                allLikes={allLikes}
                                setAllLikes={setAllLikes}
                            />
                        </div>

                        <div className="flex mr-2 lg:my-1 lg:ml-4 sm:mt-2.5 mt-2.5  ">
                            <GrView className="mr-1.5 h-6 w-6"/>
                            {blogDetails?.views_count}
                        </div>

                        <div className="flex mr-2 lg:my-1 lg:ml-1 mt-2.5">
                            <Bookmarks 
                                blog={blogDetails}
                                user={user} 
                                bookmark={bookmark}
                                setBookmark={setBookmark}
                            />
                        </div>
                        <div className="mt-2 lg:mt-4 ml-10 lg:ml-0 sm:ml-96 md:ml-80 sm:pl-16 lg:pl-0 sm:mt-1">
                            <Share 
                                title={blogDetails?.title}
                                shareImage={blogDetails?.image}
                                url={(window.location.href)}
                            />
                        </div>
                    </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="relative max-w-3xl lg:max-w-4xl mx-auto items-center justify-between">                    
                    <div className="flex flex-col ">
                        <div className="w-full ">
                            <div className="flex flex-row items-center justify-center py-1 overflow-hidden">
                                <div className="text-xl font-bold">
                                    {parse(blogDetails?.title)}
                                </div>                                                                
                            </div>
                            
                            <div>
                                <HelmetMetaData 
                                    t={blogDetails?.title}
                                    i={blogDetails?.image}
                                    // d={parse(blogDetails.body)}
                                    url={window.location.href}
                                />
                            </div>                            

                            <div className="my-1">
                                Tags: 
                                {tags.map((tag)=>(
                                    <button onClick={()=>showTaggedBlog(tag.name)} >
                                        <span className="pl-2 mt-2 mb-2 text-gray-500 cursor-pointer">{tag.name}</span>
                                    </button>
                                ))}
                            </div>             
                                                      
                            <div className="flex items-center justify-center my-3 overflow-hidden">
                                <img className="block shadow-xl mx-auto h-96 w-full bg-cover bg-center"
                                    src={blogDetails?.image} /> 
                            </div>

                            <div className="flex items-center justify-center py-1 overflow-hidden">
                                <div className="prose-lg">
                                    {parse(blogDetails.body)}
                                </div>
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

                {/* Right Side Bar */}
                <div className="invisible lg:visible lg:max-w-2xl lg:mx-10 lg:right-0 lg:top-36 mt-10 fixed">
                {isScrolled && (
                    <Link to={`/user/${blogCreator}`}>                         
                        <div className="text-base font-medium text-gray-500 
                            flex flex-row items-center mt-2">
                                <div>
                                    {!authorImg && (
                                    <FaUser className="block rounded-full  mx-auto h-40 w-40 text-gray-500 bg-cover bg-center" />
                                    )}
                                    {authorImg && (
                                    <img className="block rounded-full  mx-auto h-40 w-40 bg-cover bg-center"
                                    src={authorImg} />
                                    )} 
                                </div>                        
                        </div>
                        <div className="flex justify-center mt-2"> 
                            {blogCreator}                        
                        </div> 
                    </Link>
                )}
                </div>
            </div>            
        </div>
    )
}
