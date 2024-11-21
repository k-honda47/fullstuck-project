# fullstuck-project
## 支出管理アプリ

### 機能概要（MVP）
- 支出のサマリ 
- 取引一覧の表示、登録
- カテゴリごとの支出をグラフで可視化

### 工夫したポイント
#### ■ データの可視化

1. 取引一覧機能
- 日付、説明、金額、カテゴリごとに表示
- フロントエンドでデータを動的にレンダリング

2. グラフ機能
- カテゴリごとの支出割合を計算し、円グラフを描画
- カーソルを当てると該当カテゴリの支出を自動で表示

#### ■ MUI（Material-UI）を使ったUI設計
- CSS-in-JS（プロパティを使ってコンポーネントにスタイルを直接適用できる）

## Setup

- Server
```
cd server
npm i
(開発用) npm run dev 
(本番) npm run start
```
- Front

```
cd client
npm i
(開発用) npm run dev 
(本番) npm run start
```

- 稼働確認  
http://localhost:5173/ へアクセス