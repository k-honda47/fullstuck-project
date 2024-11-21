import React, { useState } from 'react';
import { addTransaction } from '../services/api';
import { Button, TextField, MenuItem, Typography, Box } from '@mui/material';

const AddTransactionForm = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: '',
    type: 'income',
    category: '', // カテゴリを追加
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const preparedData = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString().split('T')[0],
    };

    try {
      const response = await addTransaction(preparedData);
      alert('取引が追加されました');
      onTransactionAdded(response.data);
      setFormData({
        date: '',
        description: '',
        amount: '',
        type: 'income',
        category: '',
      });
    } catch (error) {
      console.error('Error adding transaction:', error.response?.data || error.message);
      alert(error.response?.data?.message || '取引の追加中にエラーが発生しました');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        新規取引を追加
      </Typography>
      <TextField
        label="日付"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="説明"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="金額"
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="タイプ"
        name="type"
        select
        value={formData.type}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="income">収入</MenuItem>
        <MenuItem value="expense">支出</MenuItem>
      </TextField>
      <TextField
        label="カテゴリ"
        name="category"
        value={formData.category}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" type="submit">
        追加
      </Button>
    </Box>
  );
};

export default AddTransactionForm;
