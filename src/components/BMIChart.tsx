"use client"

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

export default function BMIChart({ data, label }: { data: { label: string, value: number }[], label: string }) {
    const chartData = {
        labels: data.map(d => d.label),
        datasets: [
            {
                label: label,
                data: data.map(d => d.value),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }
        ]
    }
    
    return <Line options={{ responsive: true }} data={chartData} />
}
