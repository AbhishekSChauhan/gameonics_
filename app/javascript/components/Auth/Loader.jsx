import React from 'react'

const Loader = () => {
    return (
        
        <div>
            <div className="flex items-center justify-center ">
                <div className="w-10 h-10 border-l-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
	        <p className="w-full text-center text-white">Loading... Please wait</p>
        </div>
    )
}

export default Loader
