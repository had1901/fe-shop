import { Chart } from 'chart.js'
import React, { useEffect, useRef } from 'react'

function Home() {
  const chartRef = useRef(null)

  useEffect(() => {

    const chart = new Chart(chartRef, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  },[])

  return (
    <div>
      <div style={{width: '800px'}}><canvas ref={chartRef} id='chart'></canvas></div>
    </div>
  )
}

export default Home