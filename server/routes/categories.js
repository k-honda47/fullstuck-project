// server/routes/categories.js
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// すべてのカテゴリを取得
router.get('/', categoriesController.getAllCategories);

// 新しいカテゴリを追加
router.post('/', categoriesController.createCategory);

// カテゴリを更新
router.put('/:id', categoriesController.updateCategory);

// カテゴリを削除
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;
