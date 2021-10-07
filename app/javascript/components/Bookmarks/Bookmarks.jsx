import axios from 'axios';
import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import { FaBookmark,FaRegBookmark } from "react-icons/fa";

const Bookmarks = ({blog,user,bookmark,setBookmark}) => {
    const [bookmarked, setBookmarked] = useState(false)
    const [bookmarkDisabled, setBookmarkDisabled] = useState(true)

    // const fetchLikes = () => {
    //     setbookmark(blog?.likes)
    //     // const response = axios.get(`/blogs/${blog.id}/likes`)
    //     // setbookmark(response)
    //     // console.log('fetch likes',response)
    //     setBookmarkDisabled(false)        
    // }

    useEffect(()=> {        
        // fetchLikes()
        blogBookmarked()
        setBookmarkDisabled(false)
    },[bookmark, user?.id, blog?.id])

    const blogBookmarked = () => {
        const bookmarkFound = bookmark.find((mark)=> {
            if(mark.blog_id === blog?.id && mark.user_id === user?.id){
                return true
            }                    
        })        
        console.log('bookmarkFound',bookmarkFound)
        bookmarkFound ? setBookmarked(true) : setBookmarked(false)
        localStorage.setItem('updateBookmark', bookmarkFound ? 'true': 'false')  
    }
    console.log('bookmark',bookmark)
    // console.log('likes',likes)

    const handleLike = async() => {
        if(user?.logged_in){
            if(!bookmarkDisabled){
                setBookmarked(true)
                setBookmarkDisabled(true)
                const response = await axios.post(`/bookmarks`,{
                    blog_id: blog?.id
                })
                console.log('bookmark clicked',response)
                // bookmark.push(response.data.like)
                setBookmark((prevState)=>[...prevState,response.data.bookmark])
                // blogBookmarked()
                setBookmarkDisabled(false)
            }                        
        } else {
            toast.error('Login to bookmark this article')
        }        
    }

    const handleUnlike = async() => {
        if(user?.logged_in){
            if(!bookmarkDisabled){
                setBookmarked(false)
                setBookmarkDisabled(true)
                const unmark = bookmark.find((mark)=> {
                    if(mark?.blog_id === blog?.id && mark?.user_id === user?.id){
                        return true
                    }                    
                }) 
                const response = await axios.delete(`/bookmarks/${unmark?.id}`)
                console.log('remove bookmark clicked',response)
                // setbookmark(response.data.bookmark)
                setBookmark((prevState)=>
                    prevState.filter((bookmark) => bookmark.id !== unmark?.id)
                )
            }
            setBookmarkDisabled(false)          
        }else{
            toast.error('Login to like this article')
        }        
    }


    return (
        <div>
            {bookmarked ? (
                <div>
                    <FaBookmark onClick={handleUnlike} 
                    style={bookmarkDisabled 
                        ? {pointerEvents:'none'}
                        : {pointerEvents:'inherit'}
                    }
                    className="cursor-pointer text-black hover:text-black
                    hover:text-black"
                />
                
                </div>
                
            ) : (
                <div>
                <FaRegBookmark onClick={handleLike}
                    style={bookmarkDisabled 
                        ? {pointerEvents:'none',backgroundColor:'transparent'}
                        : {pointerEvents:'inherit'}
                    }
                    className="cursor-pointer"
                />
                </div>
            )}
            {/* &nbsp;
            {bookmark?.length}   */}
        </div>
    )
}

export default Bookmarks