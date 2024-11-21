const transactionsModelodel = require("../models/transactionsModel");
const knex = require("../db/knex");

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionsModelodel.getAllTransactions();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to get transactions" });
  }
};
exports.addTransaction = async (req, res) => {
  try {
    const { date, description, amount, type, category } = req.body;

    if (!date || !description || !amount || !type || !category) {
      return res.status(400).json({ message: '必要なフィールドが入力されていません' });
    }

    // カテゴリを取得または作成
    let categoryId;
    const existingCategory = await knex('categories').select('id').where({ name: category }).first();

    if (!existingCategory) {
      const [newCategory] = await knex('categories').insert({ name: category }).returning('id');
      categoryId = Array.isArray(newCategory) ? newCategory[0] : newCategory.id || newCategory;
    } else {
      categoryId = existingCategory.id;
    }

    // 新規取引を追加
    const [newTransaction] = await knex('transaction_data')
      .insert({
        date,
        description,
        amount,
        type,
      })
      .returning('id');

    // `newTransaction`がオブジェクト形式の場合、IDを抽出
    const transactionId =
      typeof newTransaction === 'object' && newTransaction !== null
        ? newTransaction.id
        : newTransaction;

    // デバッグ用ログ
    console.log('Category ID:', categoryId);
    console.log('Transaction ID:', transactionId);

    // 取引とカテゴリを関連付け
    await knex('transaction_categories').insert({
      transaction_id: transactionId, // 正しい整数値を挿入
      category_id: categoryId,
    });

    // 新規取引を取得して返す
    const addedTransaction = await knex('transaction_data')
      .where({ id: transactionId })
      .first();

    res.status(201).json({ ...addedTransaction, category });
  } catch (error) {
    console.error('取引追加エラー:', error);
    res.status(500).json({ message: '取引の追加中にエラーが発生しました' });
  }
};


exports.getAllTransactionsWithCategories = async (req, res) => {
  try {
    const transactions = await knex("transaction_data as td")
      .leftJoin("transaction_categories as tc", "td.id", "tc.transaction_id")
      .leftJoin("categories as c", "tc.category_id", "c.id")
      .select(
        "td.id",
        "td.amount",
        "td.date",
        "td.description",
        "td.type",
        knex.raw("ARRAY_AGG(c.name) as categories") // PostgreSQLのarray_aggを使用
      )
      .groupBy("td.id");

    res.json(
      transactions.map((tx) => ({
        ...tx,
        categories: tx.categories.filter(Boolean).join(", "), // nullを除外しカンマ区切りに変換
      }))
    );
  } catch (error) {
    console.error("Error fetching transactions with categories:", error);
    res.status(500).json({ message: "データ取得中にエラーが発生しました" });
  }
};

exports.resetSequence = async (req, res) => {
  try {
    await knex.raw(`
      SELECT setval(
        'transaction_data_id_seq', 
        COALESCE((SELECT MAX(id) FROM transaction_data), 0)
      )
    `);
    res.status(200).json({ message: "シーケンスがリセットされました" });
  } catch (error) {
    console.error("シーケンスリセットエラー:", error);
    res
      .status(500)
      .json({ message: "シーケンスリセット中にエラーが発生しました" });
  }
};
