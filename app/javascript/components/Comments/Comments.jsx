import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Comment from './Comment'
import CommentsForm from './CommentsForm'
import { AuthContext } from '../App'

export const Comments = ({blogId}) => {
    const UserDetails = React.useContext(AuthContext)
    const user = UserDetails.state.user
    const [comments, setComments] = useState([])
    const [updateComments, setUpdateComments] = useState(0)
    const [newComment, setNewComment] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        axios.get(`/blogs/${blogId}/get_comments`)
        .then((data)=>{
            setComments(data.data.comments)
            setLoading(true)
        })
        .catch((err)=>{
            console.log(err);
        })
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
        })
        .catch((error)=>{
            console.log("Error:", error)
        })
    }

    const commentsComp = comments.map((comment)=>{
        return <Comment comment={comment} key={comment.is} />
    })

    return (
        <div>
            {user !== null && (
                <CommentsForm 
                    handleSubmit={handleSubmit}
                    setNewComment={setNewComment}
                    blogId={blogId}
                />
            )}
            
            <div>
                <p>Comments</p>
                {comments.length === 0 && <p>There are no comments!</p> }
                {loading ? commentsComp : <p>Loading</p>}
            </div>
            
        </div>
    )
}
