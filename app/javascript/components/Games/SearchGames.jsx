import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { searchedGamesURL,searchGameURL } from "../apis/RawgApi";
import {useHistory} from 'react-router-dom'


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
        <div>
        <div className='position-relative'>
          <form onSubmit={submitHandler}>
          <input
            aria-label='powered by RAWG.io'
            id='searchform'
            className='w-full py-3 -ml-10 pl-10 pr-3 rounded-lg bg-gray-200  
            border items-center focus:border-blue-500 focus:bg-white focus:outline-none'
            type='text'
            placeholder='Type a video game title…'
            autoComplete='on'
            // value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
          />
          </form>
          <label htmlFor='searchform' className='d-none d-md-block input-label-style'>
            powered by RAWG.io
          </label>
          {dataIsReady ? (
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 
              md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {data?.map((game)=>(              
              <div className="rounded overflow-hidden shadow-lg w-72">
                
                <img className="h-52 w-72 object-fill cursor-pointer rounded-lg 
                  transition duration-300 transform shadow-md rounded border-2
                  hover:shadow-lg" 
                  src={game.background_image}
                  onClick={()=>showGame(game.slug)} 
                  alt="River" 
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{game.name}</div>
                  {/* <div className="px-6 pt-4 pb-2">
                    {game.platforms.map((sys)=>(
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {sys.name}
                      </span>
                    ))}
                  </div> */}
                  <p className="text-gray-700 text-base">
                    Released at : {game.released}
                  </p>
                </div>
                
                <div className="px-6 pt-4 pb-2">
                  {game.genres.map((genre)=>(
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {genre.name}
                    </span>
                  ))}
                </div>              
              </div>
              ))}
            </div>
      
          ) : null}
        </div>
      </div>
    )
}

export default SearchGames
