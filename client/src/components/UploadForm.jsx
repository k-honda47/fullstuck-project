import React, { useState } from 'react';
import { uploadCSV } from '../services/api';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [processedData, setProcessedData] = useState([]); // 整形されたデータを保持

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected File:', selectedFile);
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csv = e.target.result;

        // CSVを行ごとに分割
        const rows = csv.split('\n');

        // 不要なヘッダーやフッターをスキップし、取引データを抽出
        const data = rows
          .filter((row) => row.match(/^\d{4}\/\d{2}\/\d{2}/)) // 日付形式でフィルタリング
          .map((row) => {
            const columns = row.split(','); // カンマで列を分割
            return {
              date: columns[0].trim(), // 日付
              description: columns[1].trim(), // 説明
              amount: parseFloat(columns[2].trim()), // 金額
            };
          });

        console.log('Processed Data:', data);
        setProcessedData(data);
      };

      reader.readAsText(selectedFile, 'Shift_JIS'); // Shift_JISを指定
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('ファイルを選択してください');
      return;
    }

    // 整形済みデータをバックエンドに送信
    try {
      const response = await uploadCSV({ data: processedData }); // データをAPI経由で送信
      alert(response.data.message);
    } catch (error) {
      console.error('CSVアップロードエラー:', error.response?.data || error.message);
      alert('CSVアップロード中にエラーが発生しました');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>CSVファイルのアップロード</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button type="submit" disabled={!processedData.length}>
        アップロード
      </button>

      {processedData.length > 0 && (
        <div>
          <h3>データプレビュー:</h3>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>説明</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              {processedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.description}</td>
                  <td>{item.amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </form>
  );
};

export default UploadForm;
