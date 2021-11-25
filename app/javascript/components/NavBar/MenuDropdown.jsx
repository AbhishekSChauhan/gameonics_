import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { HiChevronDown } from "react-icons/hi";
import { Link } from 'react-router-dom';
import React from 'react'
import { FaUser } from 'react-icons/fa'
import authApi from '../apis/auth';
import toast from "react-hot-toast";
import {useHistory} from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { FaBlog, FaStarHalfAlt } from "react-icons/fa";
import { MdGames } from "react-icons/md";


export default function MenuDropdown() {
  const [loading, setLoading] = useState(false)
  let history = useHistory()


  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center mr-3 w-full text-sm font-medium text-white bg-white rounded-md bg-opacity-20 ">
            <div className="flex items-center"> 
                <div>
                  <MdMenu
                    className="w-5 h-5 mt-1.5 text-gray-500 hover:text-gray-600"
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
          <Menu.Items className="absolute w-40 z-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="flex flex-col px-1 py-1 ">
              <div className="px-1 py-1 text-gray-500">
                <Menu.Item>
                {({ active }) => (
                    <Link to={`/`}
                    className={`${active && 'text-gray-700 '}`}
                    >
                      <div className="flex flex-row items-center">
                      <ImHome className="mx-0.5"/>
                      <span className="mx-0.5">Home</span>
                      </div>
                    </Link>                    
                )}
                </Menu.Item>
              </div>

              <div className="px-1 py-1 text-gray-500">
                <Menu.Item>
                {({ active }) => (
                    <Link to={`/games`}
                    className={`${active && 'text-gray-700 '}`}
                    >
                      <div className="flex flex-row items-center">
                      <MdGames className="mx-0.5" />
                      <span className="mx-0.5">Games</span>
                      </div>
                    </Link>
                )}
                </Menu.Item>
              </div>

              <div className="px-1 py-1 text-gray-500">
                <Menu.Item>
                {({ active }) => (
                    <Link to={`/blog`}
                    className={`${active && 'text-gray-700 '}`}
                    >
                      <div className="flex flex-row items-center">
                      <FaBlog className="mx-0.5" />
                      <span className="mx-0.5">Blog</span>
                      </div>
                    </Link>
                )}
                </Menu.Item>
              </div>

              <div className="px-1 py-1 text-gray-500">
                <Menu.Item>
                {({ active }) => (
                    <Link to={`/`}
                    className={`${active && 'text-gray-700 '}`}
                    >
                      <div className="flex flex-row items-center">
                      <FaStarHalfAlt className="mx-0.5" />
                      <span className="mx-0.5">Reviews</span>
                      </div>
                    </Link>
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



