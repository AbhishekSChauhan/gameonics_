import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Comment from './CommentView'
import CommentsForm from './CommentsForm'
import { useParams } from 'react-router-dom'
import toast from "react-hot-toast";
import {Link} from 'react-router-dom'

export const Comments = ({blog,user}) => {
    const {id} = useParams()
    const [comments, setComments] = useState([])
    const [updateComments, setUpdateComments] = useState(0)
    const [newComment, setNewComment] = useState("")
    const [editComment, setEditComment] = useState('')
    // const [editComments, setEditComments] = useState('')
    const [loading, setLoading] = useState(false)
    const [updateLikes, setUpdateLikes] = useState(0)

    const source = axios.CancelToken.source()

    const fetchCommentDetails = async() => {
        try{
            const response = await axios.get(`/blogs/${blog?.id}/comments`)
            setComments(response.data.comments)

            console.log("Comments data",response)
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
    }, [updateComments, updateLikes])    

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`/blogs/${blog?.id}/comments`,{
            newComment,
        })
        .then((response)=>{
            console.log("Server response:", response)
            setNewComment("");
            setUpdateComments(updateComments + 1)
            if(response){
                response.success = response.status === 200;
                if(response.data.notice){
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

    const destroyComment = async(id) => {
        // setLoading(true)
        try {
            const response = await axios.delete(`/blogs/${blog?.id}/comments/${id}`);
            console.log('comment deleted')
                if (response.data.notice){
                    toast.success(response.data.notice)                  
                } 
            await fetchCommentDetails() 
            // setLoading(false)     
        }catch(error){
            if(error){
                toast.error(
                    error.response?.data?.notice ||
                    error.response?.data?.error ||
                    error.message ||
                    error.notice ||
                    "Something went wrong!"
                )
            }            
            console.log(error)
        }
    }

    const fetchEditComment = async(id) => {
        // setLoading(true)
        try {
          const response = await axios.get(`/blogs/${blog?.id}/comments/${id}`);          
          setEditComment(response.data.comment)
          console.log('edit fetch response',response)
        //   setLoading(false)
        } catch (error) {
          console.log('fetchBlog Error',error)
        }
    }

    const handleEditSubmit = async(id) => {
        
        setLoading(true)
        try{
            const response = await axios.put(`/blogs/${blog?.id}/comments/${id}`,{
                newComment
            })
            
            if(response){
                response.success = response.status === 200;
                if (response.data.notice){
                    toast.success(response.data.notice)                    
                }
            }
            console.log('edit submit response',response)
            // await fetchCommentDetails() 
            setLoading(false)           
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

    const commentsComp = comments.map((comment)=>{
        return <Comment 
                    data={comment} 
                    key={comment.id}
                    user = {user}
                    setUpdateLikes = {setUpdateLikes}
                    updateLikes = {updateLikes}
                    destroyComment={destroyComment} 
                    fetchEditComment={fetchEditComment}
                    editComment={editComment}
                    setNewComment={setNewComment}
                    // setEditComments={setEditComments}
                    setEditComment={setEditComment}
                    // editComments={editComments} 
                    handleEditSubmit={handleEditSubmit}
                    // setComment={setComment}                  
                />
    })

    return (
        <div className="max-w-2xl mx-auto mt-20 mb-20">
            {user.logged_in ? ( 
                <CommentsForm 
                    handleSubmit={handleSubmit}
                    setNewComment={setNewComment}
                    blogId={blog?.id}
                /> 
            ):( 
                <Link to="/login" className="font-medium sm:p-2 p-1 text-base border-2 border-gray-500">
                    Login to share your views on this article.
                </Link>
            )}  
                         
            <div className="text-lg my-8">
                {comments.length === 0 ? 
                    <p>Be the first one to comment</p> :
                    <span>Comments({comments.length})</span>
                }
            </div>
            <div>
                {loading ? commentsComp : <p>Loading</p>}
            </div>
        </div>
   
    )
}
