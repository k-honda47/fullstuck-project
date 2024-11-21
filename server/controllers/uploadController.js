const csvParser = require('csv-parser');
const knex = require('../db/knex');

exports.uploadCSV = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'ファイルがアップロードされていません' });
    }

    const { buffer } = file;
    const transactions = [];

    // CSVデータを解析
    const rows = buffer.toString().split('\n');
    const headers = rows[0].split(',').map(h => h.trim());
    const expectedHeaders = ['date', 'description', 'amount', 'type'];

    // ヘッダーの整合性チェック
    if (JSON.stringify(headers) !== JSON.stringify(expectedHeaders)) {
      return res.status(400).json({ message: 'CSVヘッダーが正しくありません' });
    }

    rows.slice(1).forEach(line => {
      const values = line.split(',');
      if (values.length === expectedHeaders.length) {
        const transaction = {};
        expectedHeaders.forEach((key, index) => {
          transaction[key] = values[index].trim();
        });
        transactions.push(transaction);
      }
    });

    // データベースへの保存
    for (const transaction of transactions) {
      // 重複チェック（例: 同じ日付・説明・金額で重複を確認）
      const exists = await knex('transaction_data')
        .where({
          date: transaction.date,
          description: transaction.description,
          amount: parseFloat(transaction.amount),
        })
        .first();

      if (exists) {
        console.log(`Skipping duplicate transaction: ${transaction.description}`);
        continue; // 重複があればスキップ
      }

      // 新規データを挿入
      await knex('transaction_data').insert({
        amount: parseFloat(transaction.amount),
        date: transaction.date,
        description: transaction.description,
        type: transaction.type,
      });
    }

    res.status(200).json({ message: 'CSVファイルが正常に処理されました' });
  } catch (error) {
    console.error('CSVアップロードエラー:', error);
    res.status(500).json({ message: 'CSVアップロード中にエラーが発生しました' });
  }
};
