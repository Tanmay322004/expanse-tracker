'use client';

import { useEffect, useState } from 'react';
import { getReportSummary } from '@/lib/api';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function DashboardPage() {
  const [summary, setSummary] = useState<{
  total: number;
  topCategory: string;
  categoryMap: Record<string, number>;
  dailySpending: Record<string, number>;
  topMethods: string[];
} | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    getReportSummary(token)
      .then(setSummary)
      .catch((err) => setError(err.message));
  }, []);

  if (!summary) return <p className="p-4">Loading...</p>;

  const pieData = {
    labels: Object.keys(summary.categoryMap),
    datasets: [
      {
        data: Object.values(summary.categoryMap),
        backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
      },
    ],
  };

  const lineData = {
    labels: Object.keys(summary.dailySpending),
    datasets: [
      {
        label: 'Spending Over Time',
        data: Object.values(summary.dailySpending),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        fill: true,
      },
    ],
  };

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">This Month</h2>
          <p>Total Spent: ₹{summary.total}</p>
          <p>Top Category: {summary.topCategory}</p>
          <p>Top Methods: {summary.topMethods.join(', ')}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Spending by Category</h2>
          <Pie data={pieData} />
        </div>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Spending Over Time</h2>
        <Line data={lineData} />
      </div>
    </main>
  );
}
