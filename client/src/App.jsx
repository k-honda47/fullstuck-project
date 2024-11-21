import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadForm from "./components/UploadForm";
import TransactionsList from "./components/TransactionsList";
import Charts from "./components/Charts";
import Summary from "./components/Summary";
import { AppBar, Toolbar, Typography, Box, Button, Container } from "@mui/material";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        {/* ヘッダー */}
        <AppBar position="static" sx={{ mb: 1, backgroundColor: "#e0e0e0" }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  fontWeight: "bold",
                  py: 0, // 上下のパディングを調整
                  backgroundColor: "#e0e0e0", // グレー背景
                  color: "#000", // 黒文字
                }}
              >
                家計簿管理
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>

        {/* ツールバー */}
        <Box sx={{ backgroundColor: "#f5f5f5", py: 0, mb: 1 }}>
          <Container maxWidth="lg">
            <Box display="flex" justifyContent="center" gap={2}>
              <Button component={Link} to="/" variant="contained" color="primary">
                ホーム
              </Button>
              <Button component={Link} to="/upload" variant="outlined" color="primary">
                アップロード
              </Button>
            </Box>
          </Container>
        </Box>

        {/* メインコンテンツ */}
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

// ホームページのコンポーネント
const Home = () => {
  return (
    <Box>
      <Box sx={{ mb: 0 }}>
        <Summary />
      </Box>
      <Box sx={{ mb: 0 }}>
        <TransactionsList />
      </Box>
      <Box>
        <Charts />
      </Box>
    </Box>
  );
};

export default App;
