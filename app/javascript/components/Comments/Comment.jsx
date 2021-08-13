import React from 'react'

export default function Comment({comment}) {
    if(!comment){
        return <div />
    }
    return (
        <div>
            <div>{comment.name} | </div>
            <div>{comment.content}</div>
        </div>
    )
}
