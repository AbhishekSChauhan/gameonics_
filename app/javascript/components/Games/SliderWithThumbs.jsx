import React, { useState, useEffect } from 'react';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderWithThumbs = ({screenshot}) => {
    const [nav1, setNav1] = useState(null)
    const [nav2, setNav2] = useState(null)


    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
    };

    const settingsThumbs = {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        // centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
      };


    return (
        <div>
            <div className="mx-10 my-10 grid grid-cols-1 ">
                <Slider 
                    {...settingsMain}
                    asNavFor={nav2}
                    ref={(slider1) => setNav1(slider1)}
                >
                    {screenshot.map((shot)=>
                        <div className="relative">
                        <div className="my-4">   
                            <img src={shot.image} 
                                alt=" random imgee" 
                                className="object-fill cursor-pointer rounded-lg h-auto w-full
                                transition duration-300 transform shadow-md rounded-lg border-2
                                hover:shadow-lg" 
                            />
                        </div> 
                        </div>
                    )}                        
                </Slider>
                <div>
                    <Slider
                        {...settingsThumbs}
                        asNavFor={nav1}
                        ref={slider2 => (setNav2(slider2))}
                    >
                        {screenshot.map((shot)=>
                            <div className=" relative">
                            <div>   
                                <img src={shot.image} 
                                    alt=" random image" 
                                    className="object-fill cursor-pointer rounded-lg h-36 w-11/12
                                    transition duration-300 transform shadow-md rounded border-2
                                    hover:shadow-lg ml-3" 
                                />
                            </div> 
                            </div>
                        )}
                    </Slider>
                </div>
            </div>            
        </div>
    )
}

export default SliderWithThumbs
