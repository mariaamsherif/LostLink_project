
import express from "express";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`LostLink server running on port ${PORT}`);
});
