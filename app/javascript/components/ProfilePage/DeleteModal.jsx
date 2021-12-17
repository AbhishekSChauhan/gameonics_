import React, {  useEffect } from 'react'
import { FaCamera } from "react-icons/fa";
import { MdImage } from "react-icons/md";
import { MdDelete,MdEdit, MdOutlineAnalytics } from "react-icons/md";


import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function DeleteModal({blog,destroyBlog}) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 5000)
    console.log('delete log check')
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="mr-2 flex items-center justify-center">        
        <button         
          className="bg-transparent text-gray-500 font-semibold py-1 px-2 rounded">
            <div className="flex flex-row items-center justify-center">
                <MdDelete className="mx-0.5" />
              <span className="mx-0.5 text-base">Delete</span>
            </div>                    
        </button>
      </div>

      <Transition key={blog.id} appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
          // onClick={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title 
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Delete your blog
                </Dialog.Title>                
                <div className="mt-2">
                  <Dialog.Description>
                    This will permanently delete your blog
                  </Dialog.Description>

                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete your blog? All of your data will
                    be permanently removed. This action cannot be undone.
                  </p>                  
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button onClick={()=>destroyBlog(blog.slug)}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
