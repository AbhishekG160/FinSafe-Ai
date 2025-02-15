// const express = require("express");
// var cors = require("cors");
// const web3 = require("./web3-methods");
// const app = express();
// const dotenv = require("dotenv");
// dotenv.config({ path: "./.env" });

// app.use(cors());
// app.use(express.json());

// const PORT = 5001;

// web3.initializeWeb3();

// app.get("/", async (req, res) => {
//   res.json({ message: "Success" });
// });
// app.use("/client", require("./routes/client"));
// app.use("/admin", require("./routes/admin"));

// app.listen(PORT, (error) => {
//   if (!error)
//     console.log(
//       "Server is Successfully Running, and App is listening on port " + PORT
//     );
//   else console.log("Error occurred, server can't start", error);
// });

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = 8000;
app.use("/api", require("./routes/admin"));

app.post('/api/auth-predict', async (req, res) => {
    try {
        const response = await axios.post('http://127.0.0.1:3000/predict/auth', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error connecting to Flask server' });
    }
});

app.listen(PORT, () => {
    console.log(`Node.js server running on http://localhost:${PORT}`);
});
