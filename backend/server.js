import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
app.use(cors());

import authRoutes from './routes/auth.js'; 
import expensesRoutes from './routes/expenses.js';
import budgetsRoutes from './routes/budgets.js';
import reportRoutes from './routes/reports.js';
app.use('/api/reports', reportRoutes);

app.use('/api/budgets', budgetsRoutes);
app.use('/api/reports', reportRoutes);


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/budgets', budgetsRoutes);
app.use('/api/reports', reportsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
