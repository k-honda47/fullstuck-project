const transactionsModelodel = require("../models/transactionsModel");

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionsModelodel.getAllTransactions();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to get transactions" });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { amount, date, description, type, category_id } = req.body;
    const [newTransaction] = await transactionsModelodel.createTransaction(
      amount,
      date,
      description,
      type,
      category_id
    );

    res.status(201).json(newTransaction);
    
  } catch (err) {
    res.status(500).json({ error: "Failed to create new transaction" });
  }
};
