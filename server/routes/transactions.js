// server/routes/transactions.js
const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');

// すべての取引を取得
router.get('/', transactionsController.getAllTransactions);

// 新しい取引を追加
router.post('/', transactionsController.createTransaction);

module.exports = router;