import React from 'react'

export default function Comment({comment}) {
    if(!comment){
        return <div />
    }
    return (
        <div>
            <div>{comment.username} | </div>
            <div>{comment.content}</div>
        </div>
    )
}
