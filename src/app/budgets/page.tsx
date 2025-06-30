'use client';

import { useEffect, useState } from 'react';
import { getBudgets, saveBudget } from '@/lib/api';

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<{ category: string; amount: number }[]>([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    getBudgets(token)
      .then(setBudgets)
      .catch((err) => setError(err.message));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const saved = await saveBudget(token, {
        category,
        amount: Number(amount),
      });
      setBudgets((prev) => {
        const existing = prev.find((b) => b.category === category);
        if (existing) {
          return prev.map((b) =>
            b.category === category ? { ...b, amount: saved.amount } : b
          );
        }
        return [...prev, saved];
      });
      setCategory('');
      setAmount('');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Something went wrong.');
    }
  };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Budgets</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2"
        />
        <button className="bg-blue-600 text-white py-2 rounded">Save Budget</button>
      </form>
      <ul>
        {budgets.map((b) => (
          <li key={b.category} className="border p-2 mb-2">
            {b.category}: ₹{b.amount}
          </li>
        ))}
      </ul>
    </main>
  );
}
