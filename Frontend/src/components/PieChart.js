import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieChart({ data, month }) {

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: '# of Items',
        data: Object.values(data),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };


  const uniqueKey = JSON.stringify(chartData);
return (
    <>
      <h2>Pie Chart Stats - {new Date(0, month - 1).toLocaleString('en', { month: 'long' })}</h2>
      <div className='pie'>

        <Pie data={chartData} key={uniqueKey} />
       
      </div>
    </>
  )
}

export default PieChart;
