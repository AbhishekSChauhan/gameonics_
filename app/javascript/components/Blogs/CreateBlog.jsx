import axios from 'axios'
import React, { useState } from 'react'
import { AuthContext } from '../App'
import PageLoader from '../PageLoader'
import CreateForm from './CreateForm'

export default function CreateBlog({history}) {
    const UserDetails = React.useContext(AuthContext)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            await axios.post("/blogs",{
                blog:{
                    title,
                    body,
                }
            })
            setLoading(false)
            history.push("/blogs")
        } catch(error){
            console.log(error)
            setLoading(false)
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
                loading={loading}
                handleSubmit={handleSubmit}            
            />            
        </div>
    )
}
