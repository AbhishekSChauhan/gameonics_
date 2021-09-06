import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { gamesDetailsURL, newGamesURL, popularGamesURL, searchedGamesURL, upcomingGamesURL } from "../apis/RawgApi";
import GamesSlider from '../Games/GamesSlider';
import PageLoader from '../PageLoader'
const Games = () => {    
    const [loading, setLoading] = useState(false)
    const [upcomingGames, setUpcomingGames] = useState([])
    const [newGames, setNewGames] = useState([])
    const [popularGames, setPopularGames] = useState([])

    useEffect(()=>{
        getUpcomingGames();
        getNewGames();
        getPopularGames();
        // getSearchedGames();
    },[])

    const getUpcomingGames = async (event) => {
        setLoading(true)
        try {
            const response = await axios.get(upcomingGamesURL()) 
            setUpcomingGames(response.data.results)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getNewGames = async (event) => {
        setLoading(true)
        try {
            const response = await axios.get(newGamesURL())
            setNewGames(response.data.results)
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
                <GamesSlider 
                    upcomingGames={upcomingGames}
                    newGames={newGames}
                    popularGames={popularGames}                    
                />
            </div>

            {/* {upcomingGames.map((game)=>(
                <GamesSlider 
                    upcomingGames={upcomingGames}
                    newGames={newGames}
                    popularGames={popularGames}
                    gameDetails={gameDetails}
                />
            ))}            */}
        </div>
    )
}

export default Games
