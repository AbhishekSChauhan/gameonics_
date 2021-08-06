import React from 'react'
import SlickSlider from './SlickSlider'
import Viewers from './Viewers'
// import Games from './Games'
const Home = (props) => {
    return (
        <div>
            
            <SlickSlider />
            <Viewers />
            <h1>status: {props.loggedInStatus}</h1>
            {/* <Games /> */}
        </div>
    )
}

export default Home
