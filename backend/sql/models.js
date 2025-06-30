import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.SQL_URI, {
  dialect: 'mysql',
  logging: false,
});

export const Report = sequelize.define('Report', {
  userId: { type: DataTypes.STRING },
  month: { type: DataTypes.STRING },  // e.g., "2025-06"
  totalSpent: { type: DataTypes.FLOAT },
  topCategory: { type: DataTypes.STRING },
  overBudgetCategories: { type: DataTypes.TEXT }, // stored as JSON string
});

// Sync model to create table if it doesn't exist
sequelize.sync().then(() => console.log("MySQL synced with Report table"));
