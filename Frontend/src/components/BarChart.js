import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart=({ data,month })=> {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: ' of Items',
        data: Object.values(data),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

 

  return (
    <>
    <h2>Bar Chart Stats - {new Date(0, month - 1).toLocaleString('en', { month: 'long' })}</h2>
    <div className='bar'>

       <Bar data={chartData}  className='bar'/>
    </div>
       </>
  )
}

export default BarChart;
