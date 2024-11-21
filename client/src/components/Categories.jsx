// src/components/Categories.jsx
import React, { useEffect, useState } from 'react';
import { getCategories, addCategory } from '../services/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      const res = await addCategory({ name: newCategory });
      setCategories([...categories, res.data]);
      setNewCategory('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>カテゴリ管理</h2>
      <form onSubmit={handleAddCategory}>
        <input 
          type="text" 
          value={newCategory} 
          onChange={(e) => setNewCategory(e.target.value)} 
          placeholder="新しいカテゴリ名" 
        />
        <button type="submit">追加</button>
      </form>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
