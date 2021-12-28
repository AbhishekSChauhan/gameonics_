import React, { useEffect, useState } from 'react'
import { Line, Bar, Pie, Scatter, Bubble,Doughnut,Radar,PolarArea } from "react-chartjs-2";
import Select from 'react-select';
import PageLoader from '../PageLoader';
import axios from 'axios'

const chartOptions = [
  { value: 'line', label: 'Line' },
  { value: 'bar', label: 'Bar' },
];

const daysOptions = [
  {value: '7', label: '7 days'},
  {value: '30', label: '30 days'}
]

const Charts = ({id}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedChart, setSelectedChart] = useState()
  const [selectedDays, setSelectedDays] = useState()

  const [dataLabel, setDataLabel] = useState([])
    const [dataValue, setDataValue] = useState([])
    const [uniqueDataLable, setUniqueDataLable] = useState([])
    const [uniqueDataValue, setUniqueDataValue] = useState([])
    const [loading, setLoading] = useState(false)

  if(loading){
    <PageLoader />
  }

  const handleChartChange = (e) => {
    setSelectedChart(e.label)
  }

  const handleDayChange = (e) => {
    setSelectedDays(e.label)
    if((e.label === '7 days') || (e.value === '7')){
      getStats('stats')
    }else if((e.label === '30 days') || (e.value === '30')){
      getStats('show_stats')
    }
  }

  useEffect(() => {
    getStats('stats')
  }, [])

  const chartData = {
    labels: dataLabel,
    datasets: [
      {
        label: "Total blog views",
        data: dataValue,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Unique blog views",
        data: uniqueDataValue,
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  const getStats = async(stat) => {
    setLoading(true)
    try{
      const response = await axios.get(`/blogs/${id}/${stat}`)
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
    }catch(error){
      console.log("stats error",error)
    }    
  }

  return (
      <div className="w-full">
        <div className="flex flex-row justify-center mb-2">
          <div className="w-80 mx-4">
            <Select
                defaultValue={{ label: "Line", value: 'line' }}
                isLoading={loading}
                onChange={handleChartChange}
                options={chartOptions}
            />
          </div>

          <div className="w-80 mx-4">
            <Select
                defaultValue={{ label: "7 days", value: '7' }}
                isLoading={loading}
                onChange={handleDayChange}
                options={daysOptions}
            />          
          </div>           
        </div> 

        <div className="flex justify-center my-4">
          <span>Impression analysis with respect to days </span>
        </div>       

        <div className="flex justify-center mt-2 mb-4">
          {(selectedChart === 'Bar') ? (
            <Bar data={chartData} />
          ):(
            <Line data={chartData} />
          )}
        </div>         
          
      </div>
  )
}

export default Charts
