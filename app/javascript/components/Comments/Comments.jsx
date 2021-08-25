import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Comment from './Comment'
import CommentsForm from './CommentsForm'
import { AuthContext } from '../App'
import { useParams } from 'react-router-dom'
import toast from "react-hot-toast";

export const Comments = ({blogId}) => {
    const UserDetails = React.useContext(AuthContext)
    const {id} = useParams()
    const user = UserDetails.state.user
    const [comments, setComments] = useState([])
    const [updateComments, setUpdateComments] = useState(0)
    const [newComment, setNewComment] = useState("")
    const [loading, setLoading] = useState(false)

    const source = axios.CancelToken.source()

    const fetchCommentDetails = async() => {
        try{
            const response = await axios.get(`/blogs/${id}`,{cancelToken:source.token})
            setComments(response.data.comments)
            console.log("Comments data",response.data.comments)
            setLoading(true)
        }catch(error){
            if(axios.isCancel(error)){
                console.log("cancelled")
            }else{
                throw error
            }
            console.log(error)
        } 
    }

    useEffect(()=>{
        fetchCommentDetails()
        return () => {
            source.cancel()
        }
    }, [updateComments])

    

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`/blogs/${blogId}/comments`,{
            newComment,
        })
        .then((response)=>{
            console.log("Server response:", response)
            setNewComment("");
            setUpdateComments(updateComments + 1)
            if(response){
                response.success = response.status === 200;
                if (response.data.notice){
                    toast.success(response.data.notice)                    
                }
            }
        })
        .catch((error)=>{
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
            console.log("Error:", error)
        })
    }

    const commentsComp = comments.map((comment)=>{
        return <Comment comment={comment} key={comment.id} />
    })

    return (
        <div className="max-w-2xl mx-auto mt-20 mb-20">  
            <CommentsForm 
                    handleSubmit={handleSubmit}
                    setNewComment={setNewComment}
                    blogId={blogId}
                />              
                <div className="text-lg my-5">
                    {comments.length === 0 ? 
                        <p>There are no comments!</p> :
                        <span>Comments({comments.length})</span>
                    }
                </div>
                <div>
                    {loading ? commentsComp : <p>Loading</p>}
                </div>
        </div>
   
    )
}
