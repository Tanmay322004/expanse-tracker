const API_URL = 'http://localhost:5000/api'; // backend base URL
import { Expense } from './types';

export async function addExpense(token: string, expense: Omit<Expense, '_id'>) {
  const res = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error('Failed to add expense');
  return res.json();
}

// Login
export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Invalid credentials');
  return res.json();
}

// Get expenses
export async function getExpenses(token: string) {
  const res = await fetch(`${API_URL}/expenses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch expenses');
  return res.json();
}
export async function register(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
}
export async function getExpenseById(token: string, id: string) {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch expense');
  return res.json();
}

export async function updateExpense(
  token: string,
  id: string,
  updatedExpense: {
    amount: number;
    category: string;
    date: string;
    paymentMethod: string;
    notes?: string;
  }
) {

  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedExpense),
  });
  if (!res.ok) throw new Error('Failed to update expense');
  return res.json();
}
export async function getBudgets(token: string) {
  const res = await fetch(`${API_URL}/budgets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch budgets');
  return res.json();
}

export async function saveBudget(
  token: string,
  budget: { category: string; amount: number }
) {
  const res = await fetch(`${API_URL}/budgets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(budget),
  });
  if (!res.ok) throw new Error('Failed to save budget');
  return res.json();
}
export async function getReportSummary(token: string) {
  const res = await fetch(`${API_URL}/reports/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to load report summary');
  return res.json();
}
