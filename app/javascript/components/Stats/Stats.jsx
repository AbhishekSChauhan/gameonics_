import React , {useEffect, useState} from 'react'
import Charts from './Charts'
import axios from 'axios'
import { useParams, Link, useLocation } from 'react-router-dom'
import PageLoader from '../PageLoader'
import { MdModeComment } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { FaBookmark,FaRegBookmark } from "react-icons/fa";
import { GrView } from "react-icons/gr";



const BlogStats = () => {
    const [dataLabel, setDataLabel] = useState([])
    const [dataValue, setDataValue] = useState([])
    const [uniqueDataLable, setUniqueDataLable] = useState([])
    const [uniqueDataValue, setUniqueDataValue] = useState([])
    const [loading, setLoading] = useState(false)

    const location = useLocation()

    const comments_count = location.state.comments_count
    const likeable_count = location.state.likeable_count
    const bookmarks_count = location.state.bookmarks_count
    const views_count = location.state.views_count

    useEffect(() => {
        getStats();
    }, [location])  

    const getStats = async() => {
        setLoading(true)
        const response = await axios.get(`/blogs/${location.state.id}/stats`)
        console.log('stats', response)
        setDataLabel(response.data.count_by_date_keys)
        setDataValue(response.data.count_by_date_values)
        setUniqueDataLable(response.data.unique_count_by_date_keys)
        setUniqueDataValue(response.data.unique_count_by_date_values)

        console.log('dataLabels', response.data.count_by_date_keys)
        console.log('dataValues', response.data.count_by_date_values)
        console.log('unique data labels', response.data.unique_count_by_date_keys)
        console.log('unique data values', response.data.unique_count_by_date_values)

        setLoading(false)
    }
   
    if(loading){
        <PageLoader />
    }

    return (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto mt-10">
                <div className="relative max-w-4xl mx-auto items-center justify-between">
                    <div className="flex flex-col ">
                        <div className="w-full "> 
                            <div className="flex flex-row justify-center pt-10 pb-10">
                                <div className="flex flex-col text-3xl mx-5 text-center">
                                    <GrView />
                                    {views_count === null ? (
                                        <span className="text-xl">0</span>
                                    ):(
                                        <span className="text-xl">{views_count}</span>
                                    )} 
                                </div>
                                <div className="flex flex-col text-3xl mx-5 text-center">
                                    <MdModeComment /> 
                                    {comments_count === null ? (
                                        <span className="text-xl">0</span>
                                    ):(
                                        <span className="text-xl">{comments_count}</span>
                                    )}                                                       
                                </div>
                                <div className="flex flex-col text-3xl mx-5 text-center">
                                    <FcLike className="text-black" />
                                    {likeable_count === null ? (
                                        <span className="text-xl">0</span>
                                    ):(
                                        <span className="text-xl">{likeable_count}</span>
                                    )} 
                                </div>
                                <div className="flex flex-col text-3xl mx-5 text-center">
                                    <FaBookmark />
                                    {bookmarks_count === null ? (
                                        <span className="text-xl">0</span>
                                    ):(
                                        <span className="text-xl">{bookmarks_count}</span>
                                    )} 
                                </div>
                            </div> 

                            <div>
                                <div className="flex mb-4 justify-center">
                                    Chart for last 7 days
                                </div>
                                <div className="">
                                    <Charts dataLabel={dataLabel} dataValue={dataValue} 
                                        uniqueDataLable={uniqueDataLable}
                                        uniqueDataValue={uniqueDataValue}
                                        loading={loading}
                                    />
                                </div>                                                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default BlogStats
