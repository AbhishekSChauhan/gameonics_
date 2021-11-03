import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { MdDelete,MdEdit } from "react-icons/md";
import parse from 'html-react-parser';

export default function TaggedBlogsList({data,showBlog,updateBlog,destroyBlog}) {
    
    return (
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 sm:justify-center md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((blog)=>(
          <div key={blog.slug}
          className="transition-all duration-150 flex w-full"
        >
         
          <div
            className="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl"
          >
            
            <div className="md:flex-shrink-0 relative">
              {/* <div className="z-10 mt-1 flex flex row text-gray-200 text-2xl absolute cursor-pointer right-0 top-0">
                  <MdDelete onClick={()=>destroyBlog(blog.slug)} />
                  <MdEdit onClick={()=>updateBlog(blog.slug)}/>
              </div> */}
              <img onClick={()=>showBlog(blog.slug)}
                src={blog.image}
                alt="Blog Cover"
                className="object-fill w-full cursor-pointer rounded-lg rounded-b-none md:h-56"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
            
              <span className="text-xs font-medium text-blue-600 uppercase">
               Videogames
              </span>
              <div className="flex flex-row items-center">
                <div
                  className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  <span>{blog.views_count}</span>
                </div>

                <div
                  className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                  <span>{blog.comments_count}</span>
                </div>

                <div
                  className="text-xs font-medium text-gray-500 flex flex-row items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    ></path>
                  </svg>
                  <span>{blog.likeable_count}</span>
                </div>
              </div>
            </div>
            <hr className="border-gray-300" />
            <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
              <a onClick={()=>showBlog(blog.slug)} className="hover:underline">
                <h2 className="text-2xl font-bold tracking-normal text-gray-800 cursor-pointer">
                  {parse(blog.title)}
                </h2>
              </a>
            </div>
            <hr className="border-gray-300" />
            {/* <p onClick={()=>showBlog(blog.slug)}
              dangerouslySetInnerHTML={{ __html: blog.body}}
              className="flex flex-row flex-wrap w-full px-4 py-2 cursor-pointer overflow-hidden text-sm text-justify text-gray-700"
            >
              {blog.body}
            </p> */}
            
            <hr className="border-gray-300" />
            <section className="px-4 py-2 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <img
                    className="object-cover h-10 rounded-full"
                    src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg"
                    alt="Avatar"
                  />
                  <div className="flex flex-col mx- cursor-pointer">
                    <a href="" className="font-semibold text-gray-700 hover:underline">
                      Written by {blog.user.username}
                    </a>
                    <span className="mx-1 text-xs text-gray-600">{blog.created_at}</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-600">5 minutes read</p>
              </div>
            </section>
          </div>
        </div>          
         ))} 

      </div>
    )
}
