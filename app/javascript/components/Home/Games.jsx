import React, { useEffect } from 'react'
import axios from 'axios'
import { newGamesURL, popularGamesURL, searchedGamesURL, upcomingGamesURL } from "../apis/RawgApi";

const Games = () => {

    const getGames = async (event) => {
        try {
            const response = await axios.get(popularGamesURL())
            console.log(response);   
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button onClick={getGames}>get games</button>
        </div>
    )
}

export default Games
