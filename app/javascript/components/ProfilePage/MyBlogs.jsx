import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { MdDelete,MdEdit, MdOutlineAnalytics } from "react-icons/md";
import parse from 'html-react-parser';
import {Link} from 'react-router-dom'
import BlogStats from '../Stats/Stats';
import { CgInsights } from "react-icons/cg";
import { FaRegComment,FaRegHeart } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { FaUser } from 'react-icons/fa'
import OptionsMenu from './OptionsMenu';

export default function MyBlogs({data,user,username,showBlog,updateBlog,destroyBlog,showStats}) {   
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 sm:justify-center md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((blog)=>(
        <div key={blog.id} className="w-96 mx-auto">
            {blog.published ? (
              <div className="md:flex-shrink-0 relative">
                <div className="z-10 mt-1 flex flex row text-gray-50 text-2xl absolute cursor-pointer mx-1 top-1 right-3">
                  {(user.username === username) ? (
                    <div className="flex flex-row">
                      <OptionsMenu 
                        blog={blog}
                        user={user}
                        username = {username}
                        showBlog={showBlog}
                        updateBlog={updateBlog}
                        destroyBlog={destroyBlog}
                        showStats={showStats}
                      />
                      {/* <CgInsights className="text-2xl mt-2 cursor-pointer" onClick={()=>showStats(blog.id, blog.slug, blog.comments_count, blog.bookmarks_count, blog.likeable_count, blog.views_count)}/>
                      <MdEdit className="text-xl mt-2.5 cursor-pointer" onClick={()=>updateBlog(blog.slug)}/>
                      <MdDelete className="text-xl mt-2.5 cursor-pointer" onClick={()=>destroyBlog(blog.slug)}/> */}
                    </div>                    
                  ):(
                    null
                  )}                    
                </div>
                <img src={blog.image} 
                alt="blog cover" onClick={()=>showBlog(blog.slug)}
                className="w-96 h-64 cursor-pointer bg-blend-screen hover:bg-blend-normal 
                object-cover object-center rounded-2xl border-t-2 border-b-2 border-l-4 border-r-4 border-white  bg-opacity-100" />
              </div>
            ) : (
              <div className="md:flex-shrink-0 relative">
                <div className="z-10 mt-1 flex flex row text-gray-50 text-2xl absolute cursor-pointer mx-1 top-1 right-3">
                    <MdDelete className="text-xl mt-2.5 cursor-pointer" onClick={()=>destroyBlog(blog.slug)} />
                    {/* <MdEdit onClick={()=>updateBlog(blog.slug)}/> */}
                </div>
                {(blog.image) !== "null" ? (
                  <img src={blog.image} 
                  alt="blog cover" onClick={()=>updateBlog(blog.slug)}
                  className="w-96 h-64 cursor-pointer bg-blend-screen hover:bg-blend-normal 
                  object-cover object-center rounded-2xl border-t-2 border-b-2 border-l-4 border-r-4 border-white  bg-opacity-100" />
                ) : (
                  <div>
                    <img src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" 
                    alt="blog cover" onClick={()=>updateBlog(blog.slug)}
                    className="w-96 h-64 cursor-pointer bg-blend-screen hover:bg-blend-normal 
                    object-cover object-center rounded-2xl border-t-2 border-b-2 border-l-4 border-r-4 border-white  bg-opacity-100" />
                  </div>
                )}
                
              </div>
             
            )}    
                                        
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
              {/*  */}
              <section className="">
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <Link to={`/user/${username}`} 
                      className="flex flex-row text-base font-normal text-gray-700 cursor-pointer ">
                    {!user.profile_image && (
                      <FaUser className="h-7 w-7  text-gray-600 rounded-full object-cover" />
                    )}
                    {user.profile_image && (
                      <img className="h-7 w-7  rounded-full object-cover" 
                      src={user.profile_image} alt="avatar"/>
                    )}                               
                    <div className="pl-2 flex flex-col ">
                        Written by {username}                                    
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
