import React,{useState} from 'react'

export default function BlogNav() {
    const [isScrolled, setIsScrolled] = useState(false)

    window.onscroll=()=>{
        // console.log(window.scrollY)
        if ((window.pageYOffset)>5){
            setIsScrolled(true)
        }else{
            setIsScrolled(false)
        }
        // if (window.scrollY >= 40){
        //     setIsScrolled(true)
        // }else{
        //     setIsScrolled(false)
        // }
        // setIsScrolled(window.pageYOffset === 0 ? false : true)
        return ()=>(window.onscroll=null)
    }

    return (
        <div className={isScrolled ? 'w-full fixed bg-gray-800' : 'w-full fixed bg-white'}>
            <button className="bg-blue-500 justify-center items-center  hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Create your own blog
            </button>
        </div>
    )
}
