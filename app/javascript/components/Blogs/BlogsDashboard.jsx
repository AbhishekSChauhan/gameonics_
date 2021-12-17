import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { MdDelete,MdEdit } from "react-icons/md";
import parse from 'html-react-parser';
import {Link} from 'react-router-dom'
import { FaRegComment,FaRegHeart } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { FaUser } from 'react-icons/fa'

export default function BlogsDashboard({data,showBlog,updateBlog,destroyBlog}) {
    
    return (
      <div className="sm:p-10 grid grid-cols-1 mx-auto sm:grid-cols-1 sm:justify-center md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((blog)=>(
          <div className="w-96 mx-auto">    
            <img src={blog.image} 
            alt="geme cover" onClick={()=>showBlog(blog.slug)}
            className="w-96 h-64 cursor-pointer bg-blend-screen hover:bg-blend-normal 
            object-cover object-center rounded-2xl border-t-2 border-b-2 border-l-4 border-r-4 border-white  bg-opacity-100" />                            
            <div className="relative px-4 -mt-16 ">
              <div className="bg-white p-4 rounded-lg shadow-lg h-32 w-88">
                {/* <div className="flex items-baseline">
                  {game.genres.map((genre)=>(                                  
                    <div className="mx-1 text-gray-600 text-xs font-semibold tracking-wider">
                    {genre.name}
                    </div>
                  ))}                                
                </div> */}
                
                <h4 onClick={()=>showBlog(blog.slug)}
                  className="mt-3 ml-1 text-lg text-left font-medium cursor-pointer leading-tight truncate">
                  {blog.title}
                </h4>
            
              <div className="mt-1.5 ml-1">                        
                <span className="text-gray-600 text-sm flex flex-row">
                  <div className="items-center flex flex-row">  <GrView className="mx-1"/> {blog.views_count} &nbsp; </div>
                  <div className="items-center flex flex-row"><FaRegHeart className="mx-1"/> {blog.likeable_count} &nbsp; </div>
                  <div className="items-center flex flex-row"> <FaRegComment className="mx-1"/> {blog.comments_count} &nbsp; </div>
                </span>
              </div>
              <div className="mt-1.5">
              <section className="">
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <Link to={`/user/${blog.user.username}`} 
                        className="flex flex-row text-base font-normal text-gray-700 cursor-pointer ">
                      {!blog.user.avatar && (
                        <FaUser className="h-7 w-7  text-gray-600 rounded-full object-cover" />
                      )}
                      {blog.user.avatar && (
                        <img className="h-7 w-7  rounded-full object-cover" 
                        src={blog.user.avatar} alt="avatar"/>
                      )}                               
                      <div className="pl-2 flex flex-col ">
                          Written by {blog.user.username}                                    
                      </div>
                      </Link>
                  </div>
                  <p className="text-xs text-gray-600">{blog.created_at}</p>
                </div>
              </section>
              {/* <div className="flex flex-col">
                <Link to={`/user/${blog.user.username}`} 
                  className="text-base font-normal text-gray-700 cursor-pointer hover:underline">
                  Written by {blog.user.username}
                </Link>
                <span className="mx-1 text-xs text-gray-600">{blog.created_at}</span>
              </div> */}
              </div>  
              </div>
            </div>                      
          </div>
         ))} 

      </div>
    )
}
