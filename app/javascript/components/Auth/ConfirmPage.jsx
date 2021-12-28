import React from 'react'
import {Link} from 'react-router-dom'
const ConfirmPage = ({user}) => {
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto
                md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
                flex items-center justify-center">
                <div className="w-full h-96 text-gray-500">
                    <div className="flex justify-center">
                        Welcome
                        <span className="text-lg text-gray-700 font-bold leading-tight">{` ${user.username}`}</span>
                        , and thanks for signing up!
                    </div>
                    <div className="mt-3">
                        <span>
                            Please check your email 
                            <span className="text-lg text-gray-700 font-semibold leading-tight">{`(${user.email})`}</span>
                            <br />
                            for the account activation link
                        </span>
                    </div>
                    <br />
                    <span className="mt-4">
                        PS: &#39;If you don&apos;t see the activation email, please check your Junk or Spam folders!&#39;
                    </span>

                    <div>
                    <Link to="/" 
                        className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400
                            text-white text-center font-semibold rounded-lg px-4 py-3 mt-6">
                            Back to home
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmPage
