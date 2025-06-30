'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addExpense } from '@/lib/api';

export default function AddExpense() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Not logged in.');
      return;
    }
    try {
      await addExpense(token, {
  amount: Number(amount), // convert here
  category,
  date,
  paymentMethod,
  notes,
});

      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Something went wrong.');
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Add Expense</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Payment Method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Save</button>
      </form>
    </main>
  );
}
