import React,{useState} from 'react'


const Publish = () => {
    const [bannerImage, setBannerImage] = useState('')

    
    return (
        <div>
        <div className="max-w-6xl border-2 border-black">
                <div className="mx-auto mt-10">
                    <div className="relative max-w-4xl mx-auto items-center justify-between">
                        <div className="flex flex-col ">
                            <div className="w-full">
                                <div className="flex items-center justify-center py-1 overflow-hidden">
                                    <button
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        
                                    >
                                        Publish
                                    </button>
                                </div>                              
                                
                            </div>  
                        </div>
                    </div>
                </div>

                </div>
            
        </div>
    )
}

export default Publish
