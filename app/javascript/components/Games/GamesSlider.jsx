import React, { useState } from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router-dom';

const GamesSlider = ({history,upcomingGames,newGames,popularGames}) => {

    const settings = {
        speed:500,
        infinite: true,
        lazyLoad: 'progressive',
        centerMode: true,
        slidesToShow:3,
        autoplay:true,
        slidesToScroll: 1,
        adaptiveHeight:true,
        arrows:true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                arrows: true,
                slidesToShow: 3
              }
            },
            {
              breakpoint: 768,
              settings: {
                arrows: true,
                slidesToShow: 1
              }
            },
            {
              breakpoint: 640,
              settings: {
                arrows: true,
                slidesToShow: 1
              }
            }
        ]
    }

    const showGame = (slug) => {
        history.push(`/games/${slug}`)
    }


    return (
        <div>
            <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
                <a>
                <h2 className="text-xl font-bold tracking-normal text-gray-800 cursor-pointer">
                    Upcoming Games
                </h2>
                </a>
            </div>
            <div className="mx-10 my-10 grid grid-cols-1 ">
                <Slider {...settings}>
                    {upcomingGames.map((game)=>(
                        <div className=" relative">
                        <div className="my-4">   
                            <img src={game.background_image} 
                                onClick={()=>showGame(game.slug)}
                                alt="game_img" 
                                className="h-80 w-72 object-fill cursor-pointer rounded-lg 
                                transition duration-300 transform shadow-md rounded border-2
                                hover:shadow-lg ml-3" 
                            />
                        </div> 
                    </div>
                    ))}                        
                </Slider>
            </div>


            <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
                <a>
                <h2 className="text-xl font-bold tracking-normal text-gray-800 cursor-pointer">
                    New Games
                </h2>
                </a>
            </div>
            <div className="mx-10 my-10 grid grid-cols-1 ">
                <Slider {...settings}>
                    {newGames.map((game)=>(
                        <div className=" relative">
                        <div className=" my-4">      
                            <img src={game.background_image}
                                onClick={()=>showGame(game.slug)} 
                                alt=" random imgee" 
                                className="h-80 w-72 object-fill cursor-pointer rounded-lg 
                                transition duration-300 transform shadow-md rounded border-2
                                hover:shadow-lg ml-3" 
                            /> 
                        </div> 
                    </div>
                    ))}                        
                </Slider>
            </div> 

            <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
                <a>
                <h2 className="text-xl font-bold tracking-normal text-gray-800 cursor-pointer">
                    Popular Games
                </h2>
                </a>
            </div>
            <div className="mx-10 my-10 grid grid-cols-1 ">
                <Slider {...settings}>
                    {popularGames.map((game)=>(
                        <div className=" relative">
                        <div className="my-4">      
                            <img src={game.background_image} 
                                onClick={()=>showGame(game.slug)}
                                alt=" random imgee" 
                                className="h-80 w-72 object-fill cursor-pointer rounded-lg 
                                transition duration-300 transform shadow-md rounded border-2
                                hover:shadow-lg ml-3" 
                            /> 
                        </div> 
                    </div>
                    ))}                        
                </Slider>
            </div>   
        </div>

                  
    )
}

export default withRouter(GamesSlider)