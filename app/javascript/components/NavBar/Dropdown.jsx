import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { HiChevronDown } from "react-icons/hi";
import { Link } from 'react-router-dom';
import React from 'react'
import { FaUser } from 'react-icons/fa'

export default function Dropdown({handleLogout,user}) {

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-white rounded-md bg-opacity-20 ">
            <div className="flex items-center px-4 py-3"> 
                {!user.profile_image && (
                  <FaUser className="h-8 w-8 rounded-full object-cover mx-1" />
                )}
                {user.profile_image && (
                  <img className="h-8 w-8 rounded-full object-cover mx-1" 
                  src={user.profile_image} alt="avatar"/>
                )}                
                <p className="text-gray-500 hover:text-gray-600 text-base mx-2">
                    <span className="font-semibold">{user.username}</span>
                </p>
                <span>
                  <HiChevronDown
                    className="w-5 h-5 ml-2 -mr-1 text-gray-500 hover:text-gray-600"
                    aria-hidden="true"
                  />
                </span>
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
                    <Link to={`/users/${user.id}`}
                    className={`${active && 'text-gray-700'}`}
                    >
                    My Profile
                    </Link>
                )}
                </Menu.Item>
              </div>

              <div className="px-1 py-1 text-gray-500">
                <Menu.Item>
                {({ active }) => (
                    <Link to=""
                    className={`${active && 'text-gray-700'}`}
                    onClick={handleLogout}
                    >
                    Logout
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



