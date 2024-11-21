import React, { useEffect, useState } from 'react';
import { getTransactionsWithCategories } from '../services/api';
import { Box, Typography } from '@mui/material';
import './Summary.css';

const Summary = () => {
  const [summary, setSummary] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsRes = await getTransactionsWithCategories();
        const transactions = transactionsRes.data;

        const income = transactions
          .filter((tx) => tx.type === 'income')
          .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

        const expense = transactions
          .filter((tx) => tx.type === 'expense')
          .reduce((sum, tx) => sum + Math.abs(parseFloat(tx.amount)), 0);

        setSummary({ income, expense });
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="summary-container">
      <Box className="summary-card">
        <Typography className="summary-title">収入</Typography>
        <Typography className="summary-amount">¥{summary.income.toLocaleString('ja-JP')}</Typography>
      </Box>
      <Box className="summary-card">
        <Typography className="summary-title">支出</Typography>
        <Typography className="summary-amount">¥{summary.expense.toLocaleString('ja-JP')}</Typography>
      </Box>
    </Box>
  );
};

export default Summary;
