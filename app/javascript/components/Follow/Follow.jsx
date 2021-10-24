import axios from 'axios';
import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import { FaHeart,FaRegHeart } from "react-icons/fa";

const Follow = ({user,receivedFollows,selectedUser,setReceivedFollows,givenFollows,username}) => {
    const [followed, setFollowed] = useState(false)
    const [followDisabled, setFollowDisabled] = useState(true)

    // const fetchLikes = () => {
    //     setReceivedFollows(blog?.likes)
    //     // const response = axios.get(`/blogs/${blog.id}/likes`)
    //     // setReceivedFollows(response)
    //     // console.log('fetch likes',response)
    //     setFollowDisabled(false)        
    // }

    useEffect(()=> {        
        // fetchLikes()
        userFollowed()
        setFollowDisabled(false)
    },[receivedFollows])

    const userFollowed = () => {
        const followFound = receivedFollows.find((follow)=> {
            if(follow.followed_id === selectedUser?.id && follow.follower_id === user?.id){
                return true
            }                    
        })        
        console.log('followFound',followFound)
        followFound ? setFollowed(true) : setFollowed(false)
        localStorage.setItem('updateFollow', followFound ? 'true': 'false')  
    }
    console.log('receivedFollows',receivedFollows)
    // console.log('likes',likes)

    const handleFollow = async() => {
        if(user?.logged_in){
            if(!followDisabled){
                setFollowed(true)
                setFollowDisabled(true)
                const response = await axios.post(`/users/${selectedUser.username}/follow`)
                console.log('follow clicked',response)
                // receivedFollows.push(response.data.fo)
                setReceivedFollows((prevState)=>[...prevState,response.data.fo])
                // userFollowed()
                setFollowDisabled(false)
            }                        
        } else {
            toast.error('Login to follow this user')
        }        
    }

    const handleUnfollow = async() => {
        if(user?.logged_in){
            if(!followDisabled){
                setFollowed(false)
                setFollowDisabled(true)
                // const unfollow = receivedFollows.find((follow)=> {
                //     if(follow.followed_id === selectedUser?.id && follow.follower_id === user?.id){
                //         return true
                //     }                    
                // }) 
                const response = await axios.post(`/users/${selectedUser.username}/unfollow`)
                // const response = await axios.delete(`/likes/${likeToDelete?.id}`)
                console.log('unfollow clicked',response)
                setReceivedFollows(response.data.fol)
                // setReceivedFollows((prevState)=>
                //     prevState.filter((like) => like.id !== likeToDelete?.id)
                // )
            }
            setFollowDisabled(false)          
        }else{
            toast.error('Login to follow this user')
        }        
    }


    return (
        <div>
            {(user.username === username) ? (
                null
                ):(
                <div>
                    {followed ? (
                        <div>
                            <button onClick={handleUnfollow} 
                                style={followDisabled 
                                    ? {pointerEvents:'none'}
                                    : {pointerEvents:'inherit'}
                                }
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium
                                    text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                            >
                                Following
                            </button>
                        </div>
                        
                    ) : (
                        <div>
                        <button onClick={handleFollow}
                            style={followDisabled 
                                ? {pointerEvents:'none',backgroundColor:'transparent'}
                                : {pointerEvents:'inherit'}
                            }
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium
                                    text-black bg-white border border-black rounded-md hover:bg-green-400
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-600"
                        >
                            Follow
                        </button>
                        </div>
                    )}                    
                </div>                    
            )}
            
            &nbsp;
            <div className="mt-3 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-center">
                <div className="flex flex-col pr-5">
                  <div>Following</div>
                  <span>{givenFollows?.length}</span>
                </div>
                <div className="flex flex-col">
                  <div>Followers</div>
                  <span>{receivedFollows?.length}</span>
                </div>                
            </div>

        </div>
    )
}

export default Follow