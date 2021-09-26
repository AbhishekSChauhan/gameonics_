import React,{useState} from 'react'
import toast,{Toaster} from 'react-hot-toast'
import {Link} from 'react-router-dom'

export default function BlogNav() {
    const [isScrolled, setIsScrolled] = useState(false)


    // window.onscroll=()=>{
    //     // console.log(window.scrollY)
    //     if ((window.pageYOffset)>5){
    //         setIsScrolled(true)
    //     }else{
    //         setIsScrolled(false)
    //     }
    //     // if (window.scrollY >= 40){
    //     //     setIsScrolled(true)
    //     // }else{
    //     //     setIsScrolled(false)
    //     // }
    //     // setIsScrolled(window.pageYOffset === 0 ? false : true)
    //     return ()=>(window.onscroll=null)
    // }

    return (
        // <div className={isScrolled ? 'w-full fixed bg-gray-800' : 'w-full fixed bg-white'}>
        <div className="flex justify-center">   
            <Link to="/blogs/create">
            <button 
                className="bg-transparent hover:bg-blue-500 text-blue-700 mt-1 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                Create your own blog
            </button>
            </Link>  
        </div>
    )
}
