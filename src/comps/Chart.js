import React, { useEffect } from 'react'
import Chart from 'chart.js';

function Charts(props) { 

  useEffect(() => {

    //bar chart    
    new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{ 
            data: [1,5,7,8,4,3,4,5,6,9,3,4],
            label: "Clients",
            borderColor: "#fafafa",
            fill: true,
            backgroundColor: "#056dff"
          }, { 
            data: [1,5,7,8,4,3,4,5,6,9,3,4],
            label: "Tasks",
            borderColor: "#fafafa",
            fill: true,
            backgroundColor: "#f9cd0a"  
          }, { 
            data: [1,5,7,8,4,3,4,5,6,9,3,4],
            label: "Projects",
            borderColor: "#fafafa",
            fill: true,
            backgroundColor: "#b230fc"   
          }
        ]   
      },      
      options: { 
        responsive:true,
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        scales:{
          xAxes: [{
            stacked: true,
            barPercentage: 0.1, 
            gridLines: {
              color: '#f5f5f5'
            },
          }],
          yAxes: [{
            stacked: true,
            gridLines: {
              color: '#f5f5f5'
            },
          }]
        }
      }
    });  
    
 
  },[])

  return (
    <>
      <canvas id={props.type}></canvas>
    </> 
  )
}

export default Charts