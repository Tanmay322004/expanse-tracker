'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getExpenseById, updateExpense } from '@/lib/api';

export default function EditExpensePage() {
  const { id } = useParams();
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    amount: '',
    category: '',
    date: '',
    paymentMethod: '',
    notes: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !id) return;

    getExpenseById(token, id as string)
      .then((data) => {
        setForm({
          amount: data.amount.toString(),
          category: data.category,
          date: data.date.slice(0, 10), // YYYY-MM-DD
          paymentMethod: data.paymentMethod,
          notes: data.notes || '',
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    if (!token || !id) return;

    try {
      await updateExpense(token, id as string, {
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
        paymentMethod: form.paymentMethod,
        notes: form.notes,
      });
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Something went wrong.');
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Expense</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="border p-2"
          placeholder="Amount"
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2"
          placeholder="Category"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="text"
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="border p-2"
          placeholder="Payment Method"
        />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="border p-2"
          placeholder="Notes"
        />
        <button className="bg-blue-600 text-white py-2 rounded">Update Expense</button>
      </form>
    </main>
  );
}
