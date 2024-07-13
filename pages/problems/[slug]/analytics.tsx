import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Model A',
      data: [85, 86, 88, 85, 90, 92, 93],
      borderColor: '#4299e1',
      backgroundColor: 'rgba(66, 153, 225, 0.5)',
      fill: true,
    },
    {
      label: 'Model B',
      data: [80, 84, 83, 84, 85, 83, 88],
      borderColor: '#48bb78',
      backgroundColor: 'rgba(72, 187, 120, 0.5)',
      fill: true,
    },
    {
      label: 'Model C',
      data: [75, 78, 78, 80, 82, 83, 85],
      borderColor: '#ed8936',
      backgroundColor: 'rgba(237, 137, 54, 0.5)',
      fill: true,
    },
    {
      label: 'Model D',
      data: [74, 72, 74, 76, 72, 80, 82],
      borderColor: '#9f7aea',
      backgroundColor: 'rgba(159, 122, 234, 0.5)',
      fill: true,
    },
    {
      label: 'Model E',
      data: [63, 67, 69, 71, 73, 75, 77],
      borderColor: '#f56565',
      backgroundColor: 'rgba(245, 101, 101, 0.5)',
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Top 5 Performant Models Over Time',
    },
  },
  scales: {
    y: {
      min: 60,
      max: 100,
      ticks: {
        stepSize: 5,
      },
      title: {
        display: true,
        text: 'Performance (%)',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Time (Months)',
      },
    },
  },
};

const MockGraph = () => {
  return <Line data={data} options={options} />;
};

export default MockGraph;
