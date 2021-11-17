import React, { useState } from 'react'
import { Line, Bar, Pie, Scatter, Bubble,Doughnut,Radar,PolarArea } from "react-chartjs-2";
import Select from 'react-select';
import PageLoader from '../PageLoader';

const options = [
  { value: 'line', label: 'Line' },
  { value: 'bar', label: 'Bar' },
];

const Charts = ({dataLabel,dataValue, uniqueDataValue, uniqueDataLable,loading}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedChart, setSelectedChart] = useState()
  const [defaultChart, setDefaultChart] = useState()

  if(loading){
    <PageLoader />
  }


  const handleChange = (e) => {
    setSelectedChart(e.label)
  }

  const data = {
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

  return (
      <div>
        <Select
            defaultValue={{ label: "Line", value: 'line' }}
            isLoading={loading}
            onChange={handleChange}
            options={options}
        />

        <div>
          {(selectedChart === 'Bar') ? (
            <Bar data={data} />
          ):(
            <Line data={data} />
          )}
          {/* {(()=>{
            if(selectedChart === 'Line'){
              return 
            }else if(selectedChart === 'Bar'){
              return <Bar data={data} />
            }              
          })()} */}
        </div>
          
          
      </div>
  )
}

export default Charts
