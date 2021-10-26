import axios from 'axios';
import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import { FaHeart,FaRegHeart } from "react-icons/fa";

const Likes = ({blog,user,allLikes,setAllLikes}) => {
    const [liked, setLiked] = useState(false)
    const [likesDisabled, setLikesDisabled] = useState(true)

    // const fetchLikes = () => {
    //     setAllLikes(blog?.likes)
    //     // const response = axios.get(`/blogs/${blog.id}/likes`)
    //     // setAllLikes(response)
    //     // console.log('fetch likes',response)
    //     setLikesDisabled(false)        
    // }

    useEffect(()=> {        
        // fetchLikes()
        blogsLiked()
        setLikesDisabled(false)
    },[allLikes, user?.id, blog?.id])

    const blogsLiked = () => {
        const likeFound = allLikes.find((like)=> {
            if(like.likeable_id === blog?.id && like.user_id === user?.id){
                return true
            }                    
        })        
        console.log('likeFound',likeFound)
        likeFound ? setLiked(true) : setLiked(false)
        localStorage.setItem('updateBlogLike', likeFound ? 'true': 'false')  
    }
    console.log('allLikes',allLikes)
    const likesCount = allLikes.length
    console.log('likes',likesCount)

    const handleLike = async() => {
        if(user?.logged_in){
            if(!likesDisabled){
                setLiked(true)
                setLikesDisabled(true)
                const response = await axios.post(`/likes`,{
                    likeable_id: blog?.id,
                    likeable_type: 'Blog',
                })
                console.log('like clicked',response)
                // allLikes.push(response.data.like)
                setAllLikes((prevState)=>[...prevState,response.data.like])
                // blogsLiked()
                setLikesDisabled(false)
            }                        
        } else {
            toast.error('Login to like this article')
        }        
    }

    const handleUnlike = async() => {
        if(user?.logged_in){
            if(!likesDisabled){
                setLiked(false)
                setLikesDisabled(true)
                const likeToDelete = allLikes.find((like)=> {
                    if(like?.likeable_id === blog?.id && like?.user_id === user?.id){
                        return true
                    }                    
                }) 
                const response = await axios.delete(`/likes/${likeToDelete?.id}`)
                console.log('unlike clicked',response)
                // setAllLikes(response.data.allLikes)
                setAllLikes((prevState)=>
                    prevState.filter((like) => like.id !== likeToDelete?.id)
                )
            }
            setLikesDisabled(false)          
        }else{
            toast.error('Login to like this article')
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

export default Likes