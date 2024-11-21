import React, { useEffect, useState } from "react";
import { getTransactionsWithCategories } from "../services/api";
import { Box, Typography } from "@mui/material";
import "./TransactionsList.css";
import AddTransactionForm from "./AddTransactions";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false); // フォーム表示状態の管理
  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsRes = await getTransactionsWithCategories();
        setTransactions(transactionsRes.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ja-JP", options);
  };

  const formatAmount = (amount) => {
    return parseFloat(amount).toLocaleString("ja-JP", {
      style: "currency",
      currency: "JPY",
    });
  };

  const handleTransactionAdded = (newTransaction) => {
    // 新規取引のカテゴリ情報を付加
    const updatedTransaction = {
      ...newTransaction,
      categories: newTransaction.category || "未分類", // カテゴリ情報を追加
    };
  
    setTransactions((prevTransactions) => [...prevTransactions, updatedTransaction]);
    setShowForm(false); // フォームを非表示に戻す
  };

  return (
    <Box className="transactions-container">
      <Typography variant="h5" gutterBottom>
        取引一覧
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm((prev) => !prev)}
        sx={{ mb: 2 }}
      >
        {showForm ? 'キャンセル' : '登録する'}
      </Button>

      {/* 条件付きでフォームを表示 */}
      {showForm && <AddTransactionForm onTransactionAdded={handleTransactionAdded} />}


      <table className="transactions-table">
        <thead>
          <tr>
            <th>日付</th>
            <th>説明</th>
            <th>金額</th>
            <th>タイプ</th>
            <th>カテゴリ</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{formatDate(tx.date)}</td>
              <td>{tx.description}</td>
              <td className={tx.amount < 0 ? "negative" : ""}>
                {formatAmount(tx.amount)}
              </td>
              <td>{tx.type === "income" ? "収入" : "支出"}</td>
              <td>{tx.categories || "未分類"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default TransactionsList;
