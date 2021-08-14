import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Comment from './Comment'
import CommentsForm from './CommentsForm'
import { AuthContext } from '../App'
import PageLoader from '../PageLoader'
import { useParams } from 'react-router-dom'

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
        })
        .catch((error)=>{
            console.log("Error:", error)
        })
    }

    const commentsComp = comments.map((comment)=>{
        return <Comment comment={comment} key={comment.id} />
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
                <p>Comment</p>
                {comments.length === 0 && <p>There are no comments!</p> }
                {loading ? commentsComp : <p>Loading</p>}
            </div>
            
        </div>
    )
}
