import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import blogsApi from '../apis/blogs'
import PageLoader from '../PageLoader'
import axios from 'axios'
import parse from 'html-react-parser';
import {useHistory} from 'react-router-dom'
import toast from "react-hot-toast";
import ImageUploadModal from '../ProfilePage/ImageUploadModal'
import ShowBlog from './ShowBlog'
import Loader from '../Auth/Loader'



export default function PreviewBlog(props) {
    const {slug} = (props.location && props.location.state) || {};
    let history = useHistory()
    const componentMounted = true
    // const {slug} = useParams()
    const [blogDetails, setBlogDetails] = useState()
    const [loading, setLoading] = useState(true)
    const [bannerImage,setBannerImage] = useState()
    const [published, setPublished] = useState(false)
    const [blogPublished, setBlogPublished] = useState({})
    const [imageSelected, setImageSelected] = useState(false)
    const [imagePosted, setImagePosted] = useState()
    const [uploadLoading, setUploadLoading] = useState(false)
    const [showLoader, setShowLoader] = useState(false)

    const source = axios.CancelToken.source()

    const fetchBlogDetails = async()=>{
        try{
            const response = await axios.get(`/blogs/${slug}/preview`, {cancelToken:source.token})
            setBlogDetails(response.data.blog)
            if(response.data.blog.image !== "null"){
                setImageSelected(true)
            }
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
        formData.append('blog[published]',published)
        try{
            const response = await axios.patch(`/blogs/${slug}/published`,formData)
            setLoading(false)
            console.log("blog publish response", response)
            setBlogPublished(response.data.blog)
            if(response){
                response.success = response.status === 200;
                if (response.data.notice){
                    toast.success('Blog Pubished')                    
                }
            }            
            history.push('/blog');
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

    const handleUnpublisherror = () => {
        if(published === false )
        {
            toast.error('First select Publish then post')
        }
        if(imageSelected === false){
            toast.error('Please upload Banner image')
        }
    }

    const handleCheckFileSize = e => {
        const elem = e.target;
        if (elem.files[0].size > 1048576) {
            elem.value = '';
            toast.error('Size is more than 1 MB')
        } else 
        { 
            setBannerImage(elem.files[0]); 
        }
    };

    const handleBannerImageSubmit = async(e) => {
        e.preventDefault()
        setUploadLoading(true)
        const formData = new FormData()
        formData.append('blog[image]',bannerImage)
        try{
          setUploadLoading(true)
          const response = await axios.patch(`/blogs/${slug}/banner_image`,formData)
          if(response.status === 200){
            toast.success(response.data.notice)
          }
          console.log('image post',response)
          setImagePosted(response.data.image)
          setImageSelected(true)
          setUploadLoading(false)
        }catch(error) {
          console.log("image upload error",error)
          setUploadLoading(false)
          if(error){
              toast.error(
                  error.response?.data?.notice ||
                  error.response?.data?.errors ||
                  error.response?.data?.error ||
                  error.message ||
                  error.notice ||
                  "Something went wrong!"
              )
          }
      }
    }
    
    useEffect(()=>{
        fetchBlogDetails()

        if(uploadLoading){
            setShowLoader(true)
        }
  
        if(!uploadLoading && showLoader){
            const timeout = setTimeout(()=> {
                setShowLoader(false)
            },600)

            return () => {
                clearTimeout(timeout)
            }
        }

        return () => {
            source.cancel()
        }
    }, [])

    if(loading){
        return <PageLoader />
    }


    return (
        <div className="bg-white mx-6">                
                <div className="max-w-6xl mx-auto mt-5 sm:mt-6 col-span-2">
                    <div className="relative text-justify max-w-4xl mx-auto items-center justify-between">
                        <div className="flex flex-col ">
                            <div className="absolute flex items-center justify-center right-0 sm:right-0 lg:-right-36 sm:-top-4 -top-8 py-1 overflow-hidden">
                                <button className="group inline-flex justify-center px-4 py-2 text-sm font-medium w-32 
                                    text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:bg-blue-400
                                    focus:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" 
                                    onClick={handlePublish}          
                                >
                                    Publish
                                </button>
                            </div>
                            <div className="absolute flex items-center justify-center right-0 sm:right-0 lg:-right-36 sm:top-8 top-4 py-1 overflow-hidden">
                                <button className="inline-flex mb-2 justify-center px-4 py-2 text-sm font-medium w-32
                                    text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200
                                    focus:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" 
                                    onClick={(published && imageSelected) ? handlePublishedSubmit : handleUnpublisherror}          
                                >
                                    Post your blog
                                </button>
                            </div> 
                          <div className="w-full">
                            <div>
                                {uploadLoading ? (
                                <div className="my-4">
                                    <Loader />
                                </div>
                                ):(
                                <div className="flex items-center justify-center pb-1 overflow-hidden mt-8">
                                    {(()=>{
                                        if((imagePosted && blogDetails.image !== "null")){
                                            return <img className="block shadow-xl mx-auto h-96 mt-10 md:mt-16 lg:mt-10 w-full bg-cover bg-center"
                                            src={imagePosted}/>
                                        }else if(blogDetails?.image !== "null"){
                                            return <img className="block shadow-xl mx-auto h-96 mt-10 md:mt-16 lg:mt-10 w-full bg-cover bg-center"
                                            src={blogDetails?.image}/>
                                        } else if(imagePosted ){
                                            return <img className="block shadow-xl mx-auto h-96 mt-10 md:mt-16 lg:mt-10 w-full bg-cover bg-center"
                                            src={imagePosted}/>
                                        }else {
                                            return <div></div>
                                        }
                                    })()} 
                                </div>
                                )}                         
                            </div>

                            

                            <div className="absolute flex items-center justify-center py-1 overflow-hidden left-0 -top-3 sm:top-0 sm:right-0">
                                    <ImageUploadModal 
                                    handleImageSubmit={handleBannerImageSubmit}
                                    handleCheckFileSize={handleCheckFileSize}
                                    uploadLoading={uploadLoading}
                                    value="banner"
                                    />                                                                                                    
                            </div>

                            <div className="flex items-center mt-8 sm:mt-10 lg:mt-12 justify-center my-3 overflow-hidden">
                                <h2 className="text-gray-700 text-xl font-bold ">
                                    {parse(blogDetails?.title)}
                                </h2>
                                {/* by <span className="text-gray-700 pl-2 text-lg font-bold">{BannerIsetBannerImage?.username}</span> */}
                            </div>                            


                            <div className="flex items-center justify-center py-1 overflow-hidden">
                                <div className="prose-lg">
                                    {parse(blogDetails?.body)}
                                </div>
                            </div>                       
                            </div>           
                        </div>
                    </div>
                </div>   
        </div>
    )
}
