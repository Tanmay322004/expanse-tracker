import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true },
  limit: { type: Number, required: true }
});

export default mongoose.model('Budget', BudgetSchema);
