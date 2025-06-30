import express from 'express';
import Expense from '../models/Expense.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Monthly summary report
router.get('/summary', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  try {
    const expenses = await Expense.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });

    const total = expenses.reduce((acc, e) => acc + e.amount, 0);

    const categoryMap = {};
    const methodMap = {};
    const dailySpending = {};

    expenses.forEach((e) => {
      categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
      methodMap[e.paymentMethod] = (methodMap[e.paymentMethod] || 0) + 1;

      const day = new Date(e.date).toISOString().split('T')[0];
      dailySpending[day] = (dailySpending[day] || 0) + e.amount;
    });

    const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
    const topMethods = Object.entries(methodMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([method]) => method);

    res.json({
      total,
      topCategory,
      categoryMap,
      dailySpending,
      topMethods,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
