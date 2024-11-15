const express = require("express");
const transactionsRoutes = require("./routes/transactions");
const categoriesRoutes = require("./routes/categories");
const uploadRoutes = require("./routes/upload");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  // ルート設定
  app.use("/api/transactions", transactionsRoutes);
  app.use("/api/categories", categoriesRoutes);
  app.use("/api/upload", uploadRoutes);
  return app;
};

module.exports = { setupServer };
