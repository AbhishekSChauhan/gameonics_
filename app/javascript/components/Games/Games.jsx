import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { gamesDetailsURL, trendingGamesURL, popularGamesURL, searchedGamesURL, searchGameURL, upcomingGamesURL } from "../apis/RawgApi";
import GamesSlider from '../Games/GamesSlider';
import PageLoader from '../PageLoader'
import SearchGames from './SearchGames';
const Games = () => {    
    const [loading, setLoading] = useState(false)
    const [upcomingGames, setUpcomingGames] = useState([])
    const [trendingGames, setTrendingGames] = useState([])
    const [popularGames, setPopularGames] = useState([])
    const [searchGames, setSearchGames] = useState([])
    useEffect(()=>{
        getUpcomingGames();
        getTrendingGames();
        getPopularGames();
        // getSearchedGames();
    },[])

    const getUpcomingGames = async (event) => {
        setLoading(true)
        try {
            const response = await axios.get(upcomingGamesURL()) 
            setUpcomingGames(response.data.results)
            console.log('upcoming games', response)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getTrendingGames = async (event) => {
        setLoading(true)
        try {
            const response = await axios.get(trendingGamesURL())
            setTrendingGames(response.data.results)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getPopularGames = async (event) => {
        setLoading(true)
        try {
            const response = await axios.get(popularGamesURL())
            setPopularGames(response.data.results)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }


    if (loading) {
        return (
          <div className="h-screen">
            <PageLoader />
          </div>
        );
    }    

    return (
        <div>
            <div>
                <SearchGames />
            </div>
            <div>                
                <GamesSlider 
                    upcomingGames={upcomingGames}
                    trendingGames={trendingGames}
                    popularGames={popularGames}                    
                />
            </div>

            {/* {upcomingGames.map((game)=>(
                <GamesSlider 
                    upcomingGames={upcomingGames}
                    TrendingGames={TrendingGames}
                    popularGames={popularGames}
                    gameDetails={gameDetails}
                />
            ))}            */}
            
        </div>
    )
}

export default Games
