const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  category: String,
  date: Date,
  method: String,
  notes: String,
});

module.exports = mongoose.model('Expense', ExpenseSchema);
