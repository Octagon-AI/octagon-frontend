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
      label: 'Accuracy',
      data: [85, 87, 88, 90, 91, 93, 95],
      borderColor: '#4299e1',
      backgroundColor: 'rgba(66, 153, 225, 0.5)',
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
      text: 'Accuracy of Data Over Time',
    },
  },
  scales: {
    y: {
      min: 80,
      max: 100,
      ticks: {
        stepSize: 5,
      },
      title: {
        display: true,
        text: 'Accuracy (%)',
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
