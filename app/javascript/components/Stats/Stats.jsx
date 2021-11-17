import React , {useEffect, useState} from 'react'
import Charts from './Charts'
import axios from 'axios'
import { useParams, Link, useLocation } from 'react-router-dom'
import PageLoader from '../PageLoader'


const BlogStats = () => {
    const [dataLabel, setDataLabel] = useState([])
    const [dataValue, setDataValue] = useState([])
    const [uniqueDataLable, setUniqueDataLable] = useState([])
    const [uniqueDataValue, setUniqueDataValue] = useState([])
    const [loading, setLoading] = useState(false)

    const location = useLocation()

    useEffect(() => {
        getStats();
    }, [])  

    const getStats = async() => {
        setLoading(true)
        const response = await axios.get(`/blogs/${location.state.slug}/stats`)
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
        <div>            
            <Charts dataLabel={dataLabel} dataValue={dataValue} 
                uniqueDataLable={uniqueDataLable}
                uniqueDataValue={uniqueDataValue}
                loading={loading}

            />
            
        </div>
    )
}

export default BlogStats
