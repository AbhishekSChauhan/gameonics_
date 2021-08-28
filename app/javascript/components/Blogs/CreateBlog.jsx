import axios from 'axios'
import Trix from "trix";
import React, { useState } from "react";
import { ReactTrixRTEInput } from "react-trix-rte";
import { AuthContext } from '../App'
import PageLoader from '../PageLoader'
import CreateForm from './CreateForm'
import toast from "react-hot-toast";

export default function CreateBlog({history}) {
    const UserDetails = React.useContext(AuthContext)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState('')
    const [files, setFiles] = useState('')

    const handleChange = (value)=>{
        setBody(value)
        console.log(value)
    }

    const handleCheckFileSize = e => {
        const elem = e.target;
        if (elem.files[0].size > 1048576) {
        alert('File is too big!', 'blogForm');
        // setRequest('waiting');
        elem.value = '';
        } else { setImage(elem.files[0]); }
    };

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
            image: image
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
            console.log("img",image)
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
                setImage={setImage}
                body={body}
                loading={loading}
                handleSubmit={handleSubmit}  
                handleChange={handleChange} 
                handleCheckFileSize={handleCheckFileSize}                        
            />            
        </div>
    )
}
