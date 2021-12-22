import React, { useState } from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router-dom';
import { FaPlaystation,FaXbox,FaWindows } from "react-icons/fa";
import { FiArrowLeftCircle,FiArrowRightCircle } from "react-icons/fi";

const GamesSlider = ({history,upcomingGames,trendingGames,popularGames}) => {

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        // style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      >
       <FiArrowRightCircle className="z-10 text-white text-2xl absolute top-28 right-5" />
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        
        // style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      >
        <FiArrowLeftCircle className="z-10 text-white text-2xl absolute top-28 left-5" />
      </div>
    );
  }
  

    const settings = {
        speed:500,
        infinite: true,
        lazyLoad: 'progressive',
        className: "center",
        centerMode: true,
        centerPadding: "60px",
        slidesToShow:3,
        autoplay:true,
        slidesToScroll: 1,
        adaptiveHeight:true,
        arrows:true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                arrows: true,
                slidesToShow: 4
              }
            },
            {
              breakpoint: 768,
              settings: {
                arrows: true,
                slidesToShow: 2
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
                <h2 className="text-xl font-bold mb-5 mt-5 tracking-normal text-gray-800 cursor-pointer">
                    Trending Games
                </h2>
                </a>
            </div>
            {/* <div className="mx-10 my-10 grid grid-cols-1 "> */}
                <Slider {...settings} >
                    {trendingGames.map((game)=>(
                      // <div className="grid grid-cols-3 gap-5 ">
                        <div className="lg:mb-20 group ">    
                        <img src={game.background_image} 
                        alt="Videogame cover" onClick={()=>showGame(game.slug)}
                        className="w-88 h-64 cursor-pointer bg-blend-screen hover:bg-blend-normal 
                        object-cover object-center rounded-2xl border-t-2 border-b-2 border-l-4 border-r-4 border-white  bg-opacity-100" />                            
                        <div className="relative px-4 -mt-16 lg:hidden lg:group-hover:block">
                          <div className="bg-white p-4 rounded-lg shadow-lg h-32 w-88">
                            <div className="flex items-baseline">
                              {game.genres.map((genre)=>(                                  
                                <div className="mx-1 text-gray-600 text-xs font-semibold tracking-wider">
                                {genre.name}
                                </div>
                              ))}                                
                            </div>
                            
                            <h4 onClick={()=>showGame(game.slug)}
                              className="mt-1 text-lg font-semibold uppercase cursor-pointer leading-tight truncate">
                              {game.name}
                            </h4>
                        
                          <div className="mt-2">                        
                            <span className="text-gray-600 text-sm flex flex-row">
                              <FaPlaystation className="mx-1"/>
                              <FaXbox className="mx-1"/>
                              <FaWindows className="mx-1"/>
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="text-teal-600 text-md font-semibold">Released date </span>
                            <span className="text-sm text-gray-600">{game.released}</span>
                          </div>  
                          </div>
                        </div>                      
                    </div>
                    // </div>
                  ))}                        
                </Slider>
             


            <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
                <a>
                <h2 className="text-xl font-bold mb-5 tracking-normal text-gray-800 cursor-pointer">
                    Upcoming Games
                </h2>
                </a>
            </div>
            {/* <div className="mx-10 my-10 grid grid-cols-1 "> */}
                {/* {renderArrows()} */}
                <Slider {...settings}>
                    {upcomingGames.map((game)=>(
                        <div className="lg:mb-20 group">    
                          <img src={game.background_image} 
                          alt="game cover" onClick={()=>showGame(game.slug)}
                          className="w-88 h-64 cursor-pointer bg-gray-400 hover:bg-gray-50 object-cover object-center rounded-2xl border-t-2 border-b-2 border-l-4 border-r-4 border-white " />                            
                          <div className="relative px-4 -mt-16 lg:hidden lg:group-hover:block">
                            <div className="bg-white p-4 rounded-lg shadow-lg h-32 w-88">
                              <div className="flex items-baseline">
                                {game.genres.map((genre)=>(                                  
                                  <div className="mx-1 text-gray-600 text-xs font-semibold tracking-wider">
                                  {genre.name}
                                  </div>
                                ))}
                                  
                              </div>
                              
                              <h4 onClick={()=>showGame(game.slug)}
                                className="mt-1 text-lg font-semibold uppercase cursor-pointer leading-tight truncate">
                                {game.name}
                              </h4>
                          
                            <div className="mt-2">                        
                              <span className="text-gray-600 text-sm flex flex-row">
                                <FaPlaystation className="mx-1"/>
                                <FaXbox className="mx-1"/>
                                <FaWindows className="mx-1"/>
                              </span>
                            </div>
                            <div className="mt-2">
                              <span className="text-teal-600 text-md font-semibold">Released date </span>
                              <span className="text-sm text-gray-600">{game.released}</span>
                            </div>  
                            </div>
                          </div>                      
                      </div>
                    ))}                        
                </Slider>
            {/* </div> */}

            <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
                <a>
                <h2 className="text-xl font-bold mb-5 tracking-normal text-gray-800 cursor-pointer">
                    Popular Games
                </h2>
                </a>
            </div>
             {/* <div className="mx-10 my-10 grid grid-cols-1 "> */}
                <Slider {...settings}>
                    {popularGames.map((game)=>(
                      <div className="lg:mb-20 group">    
                          <img src={game.background_image} 
                          alt="Videogame cover" onClick={()=>showGame(game.slug)}
                          className="w-88 h-64 cursor-pointer bg-gray-400 hover:bg-gray-50 object-cover object-center rounded-2xl border-t-2 border-b-2 border-l-4 border-r-4 border-white " />                            
                          <div className="relative px-4 -mt-16 lg:hidden lg:group-hover:block ">
                            <div className="bg-white p-4 rounded-lg shadow-lg h-32 w-88">
                              <div className="flex items-baseline">
                                {game.genres.map((genre)=>(                                  
                                  <div className="mx-1 text-gray-600 text-xs font-semibold tracking-wider">
                                  {genre.name}
                                  </div>
                                ))}
                                  
                              </div>
                              
                              <h4 onClick={()=>showGame(game.slug)}
                                className="mt-1 text-lg font-semibold uppercase cursor-pointer leading-tight truncate">
                                {game.name}
                              </h4>
                          
                            <div className="mt-2">                        
                              <span className="text-gray-600 text-sm flex flex-row">
                                <FaPlaystation className="mx-1"/>
                                <FaXbox className="mx-1"/>
                                <FaWindows className="mx-1"/>
                              </span>
                            </div>
                            <div className="mt-2">
                              <span className="text-teal-600 text-md font-semibold">Released date </span>
                              <span className="text-sm text-gray-600">{game.released}</span>
                            </div>  
                            </div>
                          </div>                      
                      </div>
                    ))}                        
                </Slider>
            {/* </div>    */}
        </div>

                  
    )
}

export default withRouter(GamesSlider)