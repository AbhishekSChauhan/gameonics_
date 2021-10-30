import React from 'react'

const ActivationPage = ({user}) => {
    return (
        <div className="flex flex-col h-screen items-center">
            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto
                md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
                flex items-center justify-center">
                <div className="w-full h-96 text-gray-500">
                    <div>
                    Congratulations
                    <span className="text-lg text-gray-700 md:text-2xl font-bold leading-tight">{` ${user.username}`}</span>
                    </div>
                    <div className="mt-2">
                    <span className="text-lg text-gray-700 md:text-2xl font-semibold leading-tight">
                        You have successfully activated your account
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivationPage
