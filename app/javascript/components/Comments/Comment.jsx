import React from 'react'

export default function Comment({comment}) {
    if(!comment){
        return <div />
    }
    return (
        // <div className="bg-white rounded shadow-sm p-8">
        //     <div className="flex justify-between mb-1">
        //         <p className="text-grey-darkest leading-normal text-lg">{comment.content}</p>
        //     </div>
        //     <div className="text-grey-dark leading-normal text-sm">
        //         <p>{comment.username} <span className="mx-1 text-xs">&bull;</span> {comment.created_at}</p>
        //     </div>
        // </div>
 
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
        </div>                                  
    )
}
