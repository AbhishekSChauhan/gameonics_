import React from 'react'
import CommentLikes from '../Likes/CommentLikes'

export default function Comment({comment,user,setUpdateLikes,updateLikes}) {
    if(!comment){
        return <div />
    }
    return (        
 
        <div className="mt-1 ml-1 mr-1 flex max-w-5xl">
            <div className="flex flex-col items-center">
                <img className="h-10 rounded-full" src="https://freesvg.org/img/pawn.png" />
                <div className="pt-4">
                    <svg width={1} height={40} viewBox="0 0 1 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.5" y1="2.18557e-08" x2="0.499998" y2={47} stroke="#D1D5DB" strokeDasharray="2 2" />
                    </svg>
                </div>
            </div>
            <div className="pl-3 max-w-5xl">
                <p className="text-sm font-semibold leading-normal text-gray-800">{comment.username}</p>
                <p className="text-xs leading-3 text-gray-500 pt-1"> on {comment.created_at} </p>
                <p className="pt-4 text-xl leading-4 text-gray-600">
                    {comment.content}
                </p>
            </div>
            <div className="pl-3">
                <CommentLikes 
                    comment={comment}
                    user={user} 
                    setUpdateLikes ={setUpdateLikes}
                    updateLikes = {updateLikes}
                    
                />
            </div>
        </div>                                  
    )
}
