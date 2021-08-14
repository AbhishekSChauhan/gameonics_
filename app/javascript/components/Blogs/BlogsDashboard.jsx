import React, { useEffect, useState} from 'react'
import axios from 'axios'
export default function BlogsDashboard({data,showBlog,updateBlog,destroyBlog}) {
    
    return (
        <div className="mx-auto py-10">
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 sm:justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {data.map((cardData) => (
                     <div key={cardData.id}
                      className="max-w-sm rounded overflow-hidden shadow-lg">
                     <img className="w-full" src="https://gmedia.playstation.com/is/image/SIEPDC/the-last-of-us-part-ii-key-art-wallpaper-desktop-image-block-01-ps4-us-04oct19?$1600px$" alt="Mountain" />
                     <div className="px-6 py-4">
                         <div onClick={()=>showBlog(cardData.id)}
                             className="font-bold text-xl mb-2 cursor-pointer"
                             >
                             {cardData.title}
                             </div>
                         <p className="text-gray-700 text-base cursor-pointer">{cardData.body}</p>
                     </div>
                     <div className="px-6 pt-4 pb-2">
                         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                     </div>
                     <div className="px-6 pt-4 pb-2">
                         <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Written by:</span>
                         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{cardData.user_id}</span>
                     </div>
                     <div className="px-6 pt-4 pb-2">
                        <button onClick={()=>destroyBlog(cardData.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                            Delete
                        </button>
                     </div>
                 </div>
                ))}                 
            </div>            
        </div>
            

    )
}
