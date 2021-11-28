import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { searchedGamesURL,searchGameURL } from "../apis/RawgApi";
import {useHistory} from 'react-router-dom'
import { FaPlaystation,FaXbox,FaWindows } from "react-icons/fa";


const SearchGames = () => {
    const [data, setData] = useState(null);
    const [dataIsReady, setDataIsReady] = useState(false);
    const [dropdownIsopened, setDropdownIsopened] = useState(false);
    const [keyword, setKeyword] = useState('');
    let history = useHistory()


    // useEffect(() => {
    //       if (keyword !== '') {
    //         try {
    //           const response =  axios.get(searchGameURL(keyword))
    //           setData(response);
    //           setDataIsReady(true);
    //         } catch (e) {
    //           console.error(e);
    //         }
    //       }
        
    // }, [keyword]);

    // const setKeywordInInput = event => {
    //     setKeyword(event.target.value);
    //     setDropdownIsopened(true);
    // };
    
    // const closeDropdown = () => {
    //     setDropdownIsopened(false);
    //     setKeyword('');
    // };
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(searchedGamesURL(keyword)) 
            setData(response.data.results)
            setDataIsReady(true)
            console.log("searched games",response)
        } catch (error) {
            console.log(error)
        }        
    }

    const showGame = (slug) => {
      history.push(`/games/${slug}`)
    }

    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto mt-10">
          <div className="relative max-w-4xl mx-auto items-center justify-between">
            <div className="flex flex-col ">
              <div className="w-full ">
                <div className='mb-8 lg:mr-3 relative'>
                  <form onSubmit={submitHandler}>
                  <input
                    aria-label='powered by RAWG.io'
                    id='searchform'
                    className='w-full py-3 pl-10 pr-3 rounded-lg bg-gray-50  
                    border items-center focus:border-blue-500 focus:bg-white focus:outline-none'
                    type='text'
                    placeholder='Type a video game title…'
                    autoComplete='on'
                    // value={keyword}
                    onChange={(e)=>setKeyword(e.target.value)}
                  />
                  </form>
                  <label htmlFor='searchform' className='absolute mt-2 right-12'>
                    powered by
                    <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer"> 
                    &nbsp; RAWG.io
                    </a>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-10">
          <div className="relative max-w-6xl mx-auto items-center justify-between">
            <div className="flex flex-col ">
              <div className="w-full ">
                
                  {dataIsReady ? (
                    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 
                      md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
                        {data?.map((game)=>(              
                          <div>    
                            <img src={game.background_image} 
                            alt="geme cover" onClick={()=>showGame(game.slug)}
                            className="w-88 h-64 cursor-pointer object-cover object-center rounded-lg shadow-md" />                            
                            <div className="relative px-4 -mt-16  ">
                              <div className="bg-white p-4 rounded-lg shadow-lg h-32 w-80">
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
                    </div>
              
                  ) : null
                  }                  
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
}

export default SearchGames
