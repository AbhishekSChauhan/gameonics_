import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { gamesDetailsURL, gamesScreenshotsURL, gamesSuggestedURL } from '../apis/RawgApi'
import PageLoader from '../PageLoader'
import axios from 'axios'
import SliderWithThumbs from './SliderWithThumbs'
import {Link} from 'react-router-dom'


const GameDetails = () => {
    const {slug} = useParams()
    const [loading, setLoading] = useState(true)
    const [gameDetail, setGameDetail] = useState([])
    const [screenshot, setScreenshot] = useState([])
    const [suggested, setSuggested] = useState([])

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

    const fetchGameDetails = async()=>{
        try{
            const response = await axios.get(gamesDetailsURL(slug));
            setGameDetail(response.data)
            setLoading(false)
            console.log("Show Game details",response)
        } catch(error){
            // if(axios.isCancel(error)){
            //     console.log('cancelled')
            // }else{
            //     throw error
            // }
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getScreenShots = async()=>{
        try{
            const response = await axios.get(gamesScreenshotsURL(slug));
            setScreenshot(response.data.results)
            setLoading(false)
            console.log("Show screenshot details",response)
        } catch(error){
            // if(axios.isCancel(error)){
            //     console.log('cancelled')
            // }else{
            //     throw error
            // }
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getSuggestedGames = async()=>{
        try{
            const response = await axios.get(gamesSuggestedURL(slug));
            setSuggested(response.data.results)
            setLoading(false)
            console.log("Show suggested games",response)
        } catch(error){
            // if(axios.isCancel(error)){
            //     console.log('cancelled')
            // }else{
            //     throw error
            // }
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // const getScreenShots = () => {
    //     setLoading(true)
    //     if((popularGameData.id) === (gameDetail.id)){
    //         setScreenshot(popularGameData.short_screenshots)
    //     }
    //     setLoading(false)
    // }
    
    useEffect(()=>{
        fetchGameDetails()
        getScreenShots()
        // window.scrollTo(0,0)
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
        // getSuggestedGames()
        // return () => {
        //     source.cancel()
        // }
    }, [])

    if(loading){
        return <PageLoader />
    }

    return (
        <div className="bg-white">
        <div className="max-w-6xl mx-auto mt-10">
            <div className="relative max-w-4xl mx-auto items-center justify-center">
                <div className="flex flex-col ">
                    <div className="w-full ">
                        <div className="flex items-center justify-center py-1 overflow-hidden">
                            <h2 className="text-gray-800 text-xl font-bold ">
                                {gameDetail?.name}
                            </h2>
                        </div>
                        
                        <div className="flex items-center justify-center px-1 py-1 overflow-hidden">
                            {gameDetail?.genres?.map((genre)=> (
                            <div className="flex flex-row items-center">
                                <div
                                    className="text-base text-gray-700 pr-2 flex flex-row items-center"
                                >
                                <span>{genre.name}</span>
                                </div>
                            </div>              
                            ))}   
                        </div>

                        <div className="flex items-center justify-center px-1 py-1 overflow-hidden">
                            {gameDetail?.publishers?.map((publisher)=> (
                            <div className="flex flex-row items-center">
                                <div
                                className="text-base text-gray-700 ml-2 mb-1 flex flex-row items-center"
                                >
                                <span>{publisher.name}</span>
                                </div>
                            </div>              
                            ))}   
                        </div>
                        
                        {/* <div className="flex ">
                            <span>by {blogCreator?.username}</span> 
                        </div> */}
                        <div>
                            <img src={gameDetail.background_image}
                                className="object-fill cursor-pointer rounded-lg h-auto w-full
                                transition duration-300 transform shadow-md rounded-lg border-2
                                hover:shadow-lg"
                            />
                        </div>

                        <div className="prose-lg mt-4">
                                {(gameDetail.description_raw)}
                        </div>
                        
                        <div>
                            <SliderWithThumbs screenshot={screenshot} />
                        </div>

                        <a href={gameDetail.website}>
                            {gameDetail.website}
                        </a>  
                    </div>  
                </div>
            </div>
        </div>
    </div>
    )
}

export default GameDetails

