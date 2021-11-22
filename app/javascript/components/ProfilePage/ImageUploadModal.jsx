import { Dialog, Transition } from '@headlessui/react'
import React, { useState, useEffect,Fragment } from 'react'
import { FaCamera } from "react-icons/fa";
import { MdImage } from "react-icons/md";

const ImageUploadModal = ({handleCheckFileSize,handleImageSubmit,uploadLoading, value}) => {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }

    return (
        <div>
            <div>
              {value === 'profile'? (
                <FaCamera onClick={openModal}
                  className="hover:text-blue-700 z-10 mt-1 flex flex row text-blue-500 
                  text-3xl absolute cursor-pointer right-24 sm:right-56 lg:right-96 
                  lg:mr-20 md:right-80 md:mr-2 bottom-4"
                />                
              ):(
                <button onClick={openModal}
                  className="bg-transparent hover:text-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-blue-700 rounded">
                    <div className="flex flex-row items-center justify-center">
                      <MdImage className="text-4xl pr-2" />
                      <span>Upload banner image</span>
                    </div>                    
                </button>
              )}
              
            </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
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
                <form onSubmit={handleImageSubmit} encType="multipart/form-data">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Upload {value}
                </Dialog.Title>
                  <div className="mt-2">                    
                      <input
                        type="file"
                        id="profileImage"
                        name="image"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleCheckFileSize}
                      />                    
                  </div>
      
                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={uploadLoading}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Update
                    </button>
                  </div>
                </form> 
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
            
        </div>
    )
}

export default ImageUploadModal
