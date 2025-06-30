// App entry and layout structure using Next.js with Tailwind CSS

// 1. app/layout.tsx
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-100 font-sans">
                <div className="flex min-h-screen">
                    <Sidebar />
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </body>
        </html>
    );
}

// 2. components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white shadow-xl p-4">
            <h2 className="text-2xl font-bold mb-6">Budget Tracker</h2>
            <nav className="space-y-4">
                <Link href="/dashboard" className="block text-blue-600 hover:underline">Dashboard</Link>
                <Link href="/expenses" className="block text-blue-600 hover:underline">Expenses</Link>
                <Link href="/settings" className="block text-blue-600 hover:underline">Budgets</Link>
                <Link href="/reports" className="block text-blue-600 hover:underline">Reports</Link>
            </nav>
        </aside>
    );
}

// 3. app/dashboard/page.tsx
import Charts from '../../components/Charts';
import SuggestionsCard from '../../components/SuggestionsCard';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl shadow">Total Spent: ₹XX</div>
                <div className="bg-white p-4 rounded-xl shadow">Top Category: Food</div>
                <div className="bg-white p-4 rounded-xl shadow">Top 3 Payment Methods: UPI, Cash, Card</div>
                <SuggestionsCard />
            </div>
            <Charts />
        </div>
    );
}

// 4. components/Charts.tsx
'use client';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement);

export default function Charts() {
    const pieData = {
        labels: ['Food', 'Rent', 'Shopping'],
        datasets: [{ data: [5000, 8000, 3000], backgroundColor: ['#f87171', '#60a5fa', '#34d399'] }]
    };
    const lineData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{ label: 'Spending', data: [5000, 7000, 6000, 8000], borderColor: '#3b82f6' }]
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-2">Category-wise Spending</h2>
                <Pie data={pieData} />
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-2">Spending Over Time</h2>
                <Line data={lineData} />
            </div>
        </div>
    );
}

// 5. components/SuggestionsCard.tsx
export default function SuggestionsCard() {
    const suggestions = [
        "You’re spending a lot on food. Try to reduce it by 15%.",
        "Your travel expenses increased a lot this month."
    ];

    return (
        <div className="bg-yellow-100 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Smart Suggestions</h2>
            <ul className="list-disc pl-5 space-y-1">
                {suggestions.map((s, idx) => <li key={idx}>{s}</li>)}
            </ul>
        </div>
    );
}
