
const express = require('express');
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use((req, res, next) => {
  console.log(${req.method} ${req.path});
  next();
});

app.use(cors());
app.use(express.json());

const PORT = 8000;
app.use("/api", require("./routes/client"));

app.post("/api/auth-predict", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:3000/predict/auth",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error connecting to Flask server" });
  }
});

app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
});
