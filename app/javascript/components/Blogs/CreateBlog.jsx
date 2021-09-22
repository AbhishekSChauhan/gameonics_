import axios from 'axios'
import Trix from "trix";
import React, { useState } from "react";
import { ReactTrixRTEInput } from "react-trix-rte";
import PageLoader from '../PageLoader'
import CreateForm from './CreateForm'
import toast from "react-hot-toast";
import ImageUploadModal from '../ProfilePage/ImageUploadModal';
import blogsApi from '../apis/blogs';

export default function CreateBlog({history}) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [loading, setLoading] = useState(false)
    const [bannerImage, setBannerImage] = useState('')

    const handleChange = (value)=>{
        setBody(value)
        console.log(value)
    }

    const handleCheckFileSize = e => {
        const elem = e.target;
        if (elem.files[0].size > 1048576) {
        elem.value = '';
        } else { setBannerImage(elem.files[0]); }
    };

    const handleBannerImageSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('blog[images]',bannerImage)

        try{
          setLoading(true)
          const response = await blogsApi.bannerImage(blog.id,formData)
          if(response.status === 200){
            toast.success(response.data.notice)
          }
          console.log('banner image post',response)
        //   setBannerImage(response.data.user)
          setLoading(false)
        }catch(error) {
          console.log("banner image error",error)
          setLoading(false)
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        // if(!UserDetails.state.isLogggedIn){
        //     alert('Please log in first!')
        // }

        // const formData = new FormData();
        // formData.append('blog[title]',title.trim())
        // formData.append('blog[body]',body)
        // formData.append('blog[image]',image)
        const variables = {
            title: title,
            body: body,
        }
        try{
            const response = await axios.post("/blogs",variables)
            setLoading(false)
            if(response){
                response.success = response.status === 200;
                if (response.data.notice){
                    toast.success(response.data.notice)                    
                }
            }
            console.log("blog submit response", response)
            history.push("/blogs")
        } catch(error){
            console.log("blog not saved error",error)
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
            if (error.response?.status === 423) {
                window.location.href = "/";
            }
        }        
    }

    if(loading){
        return <PageLoader />
    }

    return (
        <div>
            <CreateForm 
                setTitle={setTitle}
                setBody={setBody}
                body={body}
                loading={loading}
                handleSubmit={handleSubmit}  
                handleChange={handleChange} 
                handleCheckFileSize={handleCheckFileSize}                        
            /> 
            
            <div>
                
                {bannerImage.images && (
                    <img className="block rounded-full shadow-xl mx-auto -mt-24 h-48 w-48 bg-cover bg-center"
                    src={bannerImage.images} />
                )}          
            </div>
            
            <div>
                <ImageUploadModal 
                    handleBannerImageSubmit={handleBannerImageSubmit}
                    handleCheckFileSize={handleCheckFileSize}
                />        
            </div> 

        </div>
    )
}
