import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { HiChevronDown } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

export default function Dropdown({handleLogout}) {
    const UserDetails = React.useContext(AuthContext)

  return (
    <div className="w-56 text-right fixed top-16">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {/* <div class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"> */}
                <img class="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar"/>
                {/* <p class="text-gray-600 text-sm mx-2"> */}
                    <span class="font-bold">{UserDetails.username}</span>
                {/* </p> */}
            {/* </div> */}
            
            <HiChevronDown
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
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
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
                <Menu.Item>
                {({ active }) => (
                    <Link to=""
                    className={`${active && 'bg-blue-500'}`}
                    href="/account-settings"
                    >
                    My Profile
                    </Link>
                )}
                </Menu.Item>
                <Menu.Item>
                {({ active }) => (
                    <a
                    className={`${active && 'bg-blue-500'}`}
                    handleLogout={handleLogout}
                    >
                    Logout
                    </a>
                )}
                </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}



