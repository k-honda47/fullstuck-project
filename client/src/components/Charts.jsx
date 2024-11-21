import React, { useEffect, useState } from 'react';
import { getTransactionsWithCategories } from '../services/api';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './Charts.css'; // CSSファイルをインポート

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#775DD0'];

const Charts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsRes = await getTransactionsWithCategories();
        const transactions = transactionsRes.data;

        const categoryTotals = {};
        transactions.forEach(tx => {
          if (tx.type === 'expense' && tx.categories) {
            const categories = tx.categories.split(', ');
            categories.forEach(category => {
              if (categoryTotals[category]) {
                categoryTotals[category] += Math.abs(tx.amount);
              } else {
                categoryTotals[category] = Math.abs(tx.amount);
              }
            });
          }
        });

        const chartData = Object.keys(categoryTotals).map((key) => ({
          name: key,
          value: categoryTotals[key],
        }));

        setData(chartData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="charts-container">
      <h2 className="charts-title">カテゴリ別支出割合</h2>
      <div className="charts-card">
        <PieChart className="pie-chart" width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Charts;
