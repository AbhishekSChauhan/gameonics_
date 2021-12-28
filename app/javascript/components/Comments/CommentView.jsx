import React from 'react'
import CommentLikes from '../Likes/CommentLikes'
import OptionsMenu from './OptionsMenu'
import {useState} from 'react'

export default function Comment({data,setNewComment,user,setUpdateLikes,setEditComment,handleEditSubmit,updateLikes,destroyComment,fetchEditComment,editComment}) {
    const [comment, setComment] = useState(editComment.content)
    // const [edit, setEdit] = useState(editComment.content)

    if(!data){
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
                <p className="text-sm font-semibold leading-normal text-gray-800">{data.username}</p>
                <p className="text-xs leading-3 text-gray-500 pt-1"> on {data.created_at} </p>
                {(editComment.id == data.id) ? (                    
                    <form onSubmit={handleEditSubmit(editComment.id)}>
                        <div>
                            <textarea
                                maxLength="200"
                                type="text"
                                name="comment"
                                className="bg-grey-lighter h-16 py-2 px-3 border border-gray-800
                                relative flex justify-center w-full px-4 py-2
                                leading-5 text-gray-800 transition duration-150
                                ease-in-out rounded-md"
                                value={comment}
                                onChange={(e)=>{
                                    setComment(e.target.value)
                                    setNewComment(e.target.value)
                                }}
                                >
                                Update comment
                            </textarea>
                            
                        </div>
                        <button type="submit"
                            className="border border-blue-700 mt-4 right-0 bg-blue-500 
                            text-white hover:bg-blue-900 py-2 px-4 rounded tracking-wide mr-1"
                            onClick={()=>setComment("")}
                            >                            
                            Update
                        </button>
                    </form>
                    
                ):(
                    <p className="pt-4 text-xl leading-4 text-gray-600">
                        {data.content}
                    </p>
                )}
                
            </div>
            <div className="pl-3 mt-2">
                <CommentLikes 
                    comment={data}
                    user={user} 
                    setUpdateLikes={setUpdateLikes}
                    updateLikes = {updateLikes}                    
                />
            </div>
            <div className="pl-5 mt-0">
                <OptionsMenu 
                    comment={data}
                    user={user}
                    destroyComment={destroyComment}
                    fetchEditComment={fetchEditComment}
                />                  
                
            </div>
        </div>                                  
    )
}
