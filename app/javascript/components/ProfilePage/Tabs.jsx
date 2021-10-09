import { Tab } from '@headlessui/react'
import React from 'react'
import BookmarkedView from './BookmarkedView'
import MyBlogs from './MyBlogs'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Tabs({publishedBlogs,draftBlogs,bookmarkedBlogs,user,showBlog,updateBlog,destroyBlog}) {
  return (
    <Tab.Group>
      <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
        <Tab
            className={({ selected }) =>
            classNames(
                'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-gray-400'
                )  
            }
        >
          My Blogs
        </Tab>

        <Tab
            className={({ selected }) =>
            classNames(
                'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-gray-400'
                )  
            }
        >
          Bookmarks          
        </Tab>

        <Tab
            className={({ selected }) =>
            classNames(
                'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-gray-400'
                )  
            }
        >
          Drafts
        </Tab>      
      </Tab.List>


      <Tab.Panels className="mt-2">

      <Tab.Panel
            // key={idx}
            className={classNames(
              'bg-white rounded-xl p-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}
        >
          {publishedBlogs.length === 0 ? (
            <h1 className="text-3xl font-semibold pt-4 lg:pt-5 text-center">
              You haven't shared your story yet
            </h1>
          ) : 
            (
            <MyBlogs 
              data={publishedBlogs}
              user = {user}
              showBlog={showBlog}
              updateBlog={updateBlog}
              destroyBlog={destroyBlog}
            />
          )}                  
        </Tab.Panel>
        <Tab.Panel
            // key={idx}
            className={classNames(
              'bg-white rounded-xl p-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}
        >
          {bookmarkedBlogs.length === 0 ? (
              <h1 className="text-3xl font-semibold pt-4 lg:pt-5 text-center">
                You haven't bookmarked any post
              </h1>
          ) : (
            <div className="mt-2 pb-10 w-full mx-auto flex flex-col items-center justify-center">
              <BookmarkedView 
                data={bookmarkedBlogs}
                showBlog={showBlog}
              />
            </div>
          )}
        </Tab.Panel>

        <Tab.Panel
            // key={idx}
            className={classNames(
              'bg-white rounded-xl p-3',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}
        >
            {draftBlogs.length === 0 ? (
              <h1 className="text-3xl font-semibold pt-4 lg:pt-5 text-center">
                No Drafts
              </h1>
            ) : 
              (
              <div className="mt-2 pb-10 w-full mx-auto flex flex-col items-center justify-center">
                <MyBlogs 
                  data={draftBlogs}
                  user = {user}
                  showBlog={showBlog}
                  updateBlog={updateBlog}
                  destroyBlog={destroyBlog}
                />
              </div>
            )}                  
        </Tab.Panel>

        
      </Tab.Panels>
    </Tab.Group>
  )
}