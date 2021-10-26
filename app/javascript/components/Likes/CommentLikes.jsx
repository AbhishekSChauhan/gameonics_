import axios from 'axios';
import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import { FaHeart,FaRegHeart } from "react-icons/fa";

const CommentLikes = ({comment,user,setUpdateLikes,updateLikes}) => {
    const [liked, setLiked] = useState(false)
    const [likesDisabled, setLikesDisabled] = useState(true)
    const [allLikes, setAllLikes] = useState([])

    const fetchLikes = () => {
        setAllLikes(comment?.likes)
        setLikesDisabled(false)        
    }

    useEffect(()=> {        
        fetchLikes()
        commentsLiked()
    },[comment?.likes, allLikes, user?.id, comment?.id])

    const commentsLiked = () => {
        const likeFound = allLikes.find((like)=> {
            if(like.likeable_id === comment?.id && like.user_id === user?.id){
                return true
            }                    
        })        
        console.log('comment likeFound',likeFound)
        likeFound ? setLiked(true) : setLiked(false)
        localStorage.setItem('updateBlogLike', likeFound ? 'true': 'false')  
    }
    console.log('comments allLikes',allLikes)

    const handleLike = async() => {
        if(user?.logged_in){
            if(!likesDisabled){
                setLiked(true)
                setLikesDisabled(true)
                const response = await axios.post(`/likes`,{
                    likeable_id: comment?.id,
                    likeable_type: 'Comment',
                })
                setAllLikes((prevState)=>[...prevState,response.data.like])
                console.log('comment like clicked',response)
                setUpdateLikes(updateLikes + 1)
                // allLikes.push(response.data.like)
                setLikesDisabled(false)
            }                        
        } else {
            toast.error('Login to like this comment')
        }        
    }

    const handleUnlike = async() => {
        if(user?.logged_in){
            if(!likesDisabled){
                setLiked(false)
                setLikesDisabled(true)
                const likeToDelete = allLikes.find((like)=> {
                    if(like?.likeable_id === comment?.id && like?.user_id === user?.id){
                        return true
                    }                    
                }) 
                const response = await axios.delete(`/likes/${likeToDelete?.id}`)
                console.log('comment unlike clicked',response)
                setUpdateLikes(updateLikes - 1)
                setAllLikes((prevState)=>
                    prevState.filter((like) => like.id !== likeToDelete?.id)
                )
            }
            setLikesDisabled(false)          
        }else{
            toast.error('Login to like this comment')
        }        
    }


    return (
        <div>
            {liked ? (
                <div>
                    <FaHeart onClick={handleUnlike} 
                    style={likesDisabled 
                        ? {pointerEvents:'none'}
                        : {pointerEvents:'inherit'}
                    }
                    className="cursor-pointer text-red-600 hover:text-red-500
                    hover:text-red-500"
                />
                
                </div>
                
            ) : (
                <div>
                <FaRegHeart onClick={handleLike}
                    style={likesDisabled 
                        ? {pointerEvents:'none',backgroundColor:'transparent'}
                        : {pointerEvents:'inherit'}
                    }
                    className="cursor-pointer"
                />
                </div>
            )}
            &nbsp;
            {allLikes?.length}
        </div>
    )
}

export default CommentLikes