const pdfParse = require("pdf-parse");
const uploadModel = require("../models/uploadModel");

// PDFアップロード
exports.uploadPDF = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, mimetype, buffer } = file;

    // PDFをパース
    const data = await pdfParse(buffer);

    // PDFのテキストから取引情報を解析
    // const transactions = parsePDF(data.text);

    // 取引情報をデータベースに挿入
    // await knex('transactions').insert(transactions);

    // ファイルデータをデータベースに保存
    await uploadModel.uploadPDF({
      file_name: originalname,
      mime_type: mimetype,
      file_data: buffer,
    });

    res.status(200).json({ message: "Success Upload File" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload" });
  }
};

// PDFから取引情報を解析する関数（例）
// function parsePDF(text) {
//   const transactions = [];
//   const lines = text.split('\n');

//   lines.forEach(line => {
//     // 取引のフォーマットに合わせて正規表現を調整
//     const regex = /(\d{4}-\d{2}-\d{2})\s+(.+?)\s+(-?\d+\.\d{2})/;
//     const match = line.match(regex);
//     if (match) {
//       const [_, date, description, amount] = match;
//       transactions.push({
//         amount: parseFloat(amount),
//         date: date,
//         description: description,
//         type: parseFloat(amount) < 0 ? 'expense' : 'income',
//         category_id: determineCategory(description) // カテゴリを決定する関数
//       });
//     }
//   });

//   return transactions;
// }

// // カテゴリを決定する関数（例）
// function determineCategory(description) {
//   // 取引内容に基づいてカテゴリを決定するロジックを実装
//   return 7; // 例として「その他」のカテゴリIDを返す
// }
