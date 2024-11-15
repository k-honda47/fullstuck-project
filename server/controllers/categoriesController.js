// server/controllers/categoriesController.js
const categoriesModel = require("../models/categoriesModel");

// すべてのカテゴリを取得
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesModel.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failde to get all categories' });
  }
};

// 新しいカテゴリを追加
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const [newCategory] = await categoriesModel.createCategory();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create new category' });
  }
};

// カテゴリを更新
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await categoriesModel.updateCategory(id, name);
    if (updated.length) {
      res.json(updated[0]);
    } else {
      res.status(404).json({ message: 'Category is not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update category' });
  }
};

// カテゴリを削除
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await categoriesModel.deleteCategory(id);
    if (deleted) {
      res.json({ message: 'Category is deleted' });
    } else {
      res.status(404).json({ message: 'Category is not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete category' });
  }
};
