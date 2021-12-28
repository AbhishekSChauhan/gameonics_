import React, { useEffect, useState } from 'react'
import { CgArrowUpR } from "react-icons/cg";

const ScrollToTop = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    const scrollTop = ()=> {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }

    useEffect(()=>{
        const scrollArrow = () => {
            if(window.pageYOffset > 500 ) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll",scrollArrow)

        return () => window.removeEventListener("scroll",scrollArrow)
    },[])

    return (
        <div>
            {isScrolled && (
                <div className="z-10 flex text-gray-600 text-5xl fixed cursor-pointer right-6 sm:right-3 bottom-12"
                    onClick={scrollTop}>
                    <CgArrowUpR />
                </div>
            )}            
        </div>
    )
}

export default ScrollToTop
