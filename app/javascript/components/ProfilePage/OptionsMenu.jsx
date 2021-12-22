import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { HiChevronDown } from "react-icons/hi";
import React from 'react'
import { FaUser } from 'react-icons/fa'
import authApi from '../apis/auth';
import toast from "react-hot-toast";
import {useHistory} from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { FaBlog, FaStarHalfAlt } from "react-icons/fa";
import { MdGames } from "react-icons/md";
import { MdDelete,MdEdit, MdOutlineAnalytics } from "react-icons/md";
import { CgInsights } from "react-icons/cg";
import DeleteModal from './DeleteModal';


export default function OptionsMenu({blog,user,username,updateBlog,destroyBlog,showStats}) {
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);
  let history = useHistory()


  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center  w-full text-sm font-medium text-white  rounded-md bg-opacity-0 ">
            <div className="flex items-center"> 
                <div>
                  <MdMenu
                    className="w-5 h-5 mt-1.5 text-gray-50 hover:text-gray-600"
                    aria-hidden="true"
                  />
                </div>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute w-28 z-40 right-0 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="flex flex-col px-0.5 py-0.5 ">
              <div className="px-0.5 py-0.5 text-gray-500">
                <Menu.Item>
                {({ active }) => (
                    <button onClick={()=>showStats(blog.id, blog.slug, blog.comments_count, blog.bookmarks_count, blog.likeable_count, blog.views_count)}
                       className={`${active && 'text-gray-700 '}`}
                    >
                      <div className="flex flex-row items-center">
                      <CgInsights className="mx-0.5"/>
                      <span className="mx-0.5 text-base">Analytics</span>
                      </div>
                    </button>                    
                )}
                </Menu.Item>
              </div>

              <div className="px-0.5 py-0.5 text-gray-500">
                <Menu.Item>
                {({ active }) => (
                    <button onClick={()=>updateBlog(blog.slug)} 
                        className={`${active && 'text-gray-700 '}`}
                    >
                      <div className="flex flex-row items-center">
                      <MdEdit className="mx-0.5" />
                      <span className="mx-0.5 text-base">Edit</span>
                      </div>
                    </button>
                )}
                </Menu.Item>
              </div>

              <div className="px-0.5 py-0.5 text-gray-500">
                <Menu.Item>
                {({ active }) => (
                  <div>
                    <div 
                    onClick={()=>setModal(true)}
                           className={`${active && 'text-gray-700 '}`}
                    >
                      <div className="flex flex-row items-center">
                      <MdDelete className="mx-0.5" />
                      <span className="mx-0.5 text-base">Delete</span>                      
                      </div>
                    </div>
                    <DeleteModal 
                    blog={blog}
                    destroyBlog={destroyBlog}
                    show={modal}
                    close={Toggle}
                  />
                  </div>
                )}
                
                </Menu.Item>
              </div>
              
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}



