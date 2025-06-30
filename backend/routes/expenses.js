const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();

// Auth middleware
const auth = require('../utils/auth');

// CRUD
router.get('/', auth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.userId });
  res.json(expenses);
});

router.post('/', auth, async (req, res) => {
  const expense = new Expense({ ...req.body, userId: req.userId });
  await expense.save();
  res.status(201).send(expense);
});

router.put('/:id', auth, async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

router.delete('/:id', auth, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.send({ message: 'Deleted' });
});

module.exports = router;
