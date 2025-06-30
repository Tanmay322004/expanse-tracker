import express from 'express';
import Budget from '../models/Budget.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Create or update a budget
router.post('/', verifyToken, async (req, res) => {
  try {
    const { category, amount } = req.body;
    const userId = req.user.id;

    let budget = await Budget.findOne({ user: userId, category });

    if (budget) {
      // Update existing budget
      budget.amount = amount;
      await budget.save();
    } else {
      // Create new budget
      budget = new Budget({ user: userId, category, amount });
      await budget.save();
    }

    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all budgets for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const budgets = await Budget.find({ user: userId });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
