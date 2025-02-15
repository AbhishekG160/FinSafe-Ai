// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const { generateRandomLogs, predictMLScore } = require("../utils");
// const { addFilestoIPFS } = require("../ipfs");
// const { addBlock } = require("../web3-methods");

// router.post("/addLog", async (req, res) => {
//   const { logData } = req.body;
//   const ml_risk_score = predictMLScore(logData);
//   fs.appendFile(
//     `./${process.env.LOCAL_LOG_FOLDER}/${logData.campLocation}.txt`,
//     `${logData.campLocation},${logData.timestamp},${logData.source},${logData.destination},${logData.user},${logData.device},${logData.eventType},${logData.eventDescription},${logData.eventSeverity},${ml_risk_score}\n`,
//     function (err) {
//       if (err) throw err;
//     }
//   );
//   fs.appendFile(
//     `./${process.env.LOCAL_LOG_FOLDER}/All.txt`,
//     `${logData.campLocation},${logData.timestamp},${logData.source},${logData.destination},${logData.user},${logData.device},${logData.eventType},${logData.eventDescription},${logData.eventSeverity},${ml_risk_score}\n`,
//     function (err) {
//       if (err) throw err;
//     }
//   );

//   res.json({ message: "Success" });
// });
// router.post("/addLogs", (req, res) => {
//   const { numberoflogs, campLocation } = req.body;
//   let content = "";
//   const logs = generateRandomLogs(numberoflogs, campLocation);
//   logs.forEach(
//     (logData) =>
//       (content += `${campLocation},${logData.timestamp},${logData.source},${logData.destination},${logData.user},${logData.device},${logData.eventType},${logData.eventDescription},${logData.eventSeverity},${logData.mlRiskScore}\n`)
//   );
//   fs.appendFile(
//     `./${process.env.LOCAL_LOG_FOLDER}/${campLocation}.txt`,
//     content,
//     function (err) {
//       if (err) throw err;
//     }
//   );
//   fs.appendFile(
//     `./${process.env.LOCAL_LOG_FOLDER}/All.txt`,
//     content,
//     function (err) {
//       if (err) throw err;
//     }
//   );
//   res.json({ message: "Success" });
// });
// router.post("/triggerIPFSBlockChain", async (req, res) => {
//   const response = await addFilestoIPFS([
//     {
//       path: "Delhi.txt",
//       content: fs.readFileSync(`./${process.env.LOCAL_LOG_FOLDER}/Delhi.txt`, {
//         encoding: "base64",
//       }),
//     },
//     {
//       path: "Mumbai.txt",
//       content: fs.readFileSync(`./${process.env.LOCAL_LOG_FOLDER}/Mumbai.txt`, {
//         encoding: "base64",
//       }),
//     },
//     {
//       path: "Bangalore.txt",
//       content: fs.readFileSync(
//         `./${process.env.LOCAL_LOG_FOLDER}/Bangalore.txt`,
//         {
//           encoding: "base64",
//         }
//       ),
//     },
//   ]);
//   addBlock(response[0].path, "Delhi");
//   addBlock(response[1].path, "Mumbai");
//   addBlock(response[2].path, "Bangalore");
//   const bngContent = fs.readFileSync(
//     `./${process.env.LOCAL_LOG_FOLDER}/Bangalore.txt`
//   );
//   const mumContent = fs.readFileSync(
//     `./${process.env.LOCAL_LOG_FOLDER}/Mumbai.txt`
//   );
//   const delContent = fs.readFileSync(
//     `./${process.env.LOCAL_LOG_FOLDER}/Delhi.txt`
//   );
//   fs.appendFileSync(
//     `./${process.env.CENTRAL_LOG_FOLDER}/Delhi.txt`,
//     delContent,
//     function () {
//       console.log("done");
//     }
//   );
//   fs.appendFileSync(
//     `./${process.env.CENTRAL_LOG_FOLDER}/Mumbai.txt`,
//     mumContent,
//     function () {
//       console.log("done");
//     }
//   );
//   fs.appendFileSync(
//     `./${process.env.CENTRAL_LOG_FOLDER}/Bangalore.txt`,
//     bngContent,
//     function () {
//       console.log("done");
//     }
//   );
//   fs.appendFileSync(
//     `./${process.env.CENTRAL_LOG_FOLDER}/All.txt`,
//     bngContent + mumContent + delContent,
//     function () {
//       console.log("done");
//     }
//   );
//   fs.writeFileSync(
//     `./${process.env.LOCAL_LOG_FOLDER}/Bangalore.txt`,
//     "",
//     function () {
//       console.log("done");
//     }
//   );
//   fs.writeFileSync(
//     `./${process.env.LOCAL_LOG_FOLDER}/Delhi.txt`,
//     "",
//     function () {
//       console.log("done");
//     }
//   );
//   fs.writeFileSync(
//     `./${process.env.LOCAL_LOG_FOLDER}/Mumbai.txt`,
//     "",
//     function () {
//       console.log("done");
//     }
//   );
//   fs.writeFileSync(
//     `./${process.env.LOCAL_LOG_FOLDER}/All.txt`,
//     "",
//     function () {
//       console.log("done");
//     }
//   );

//   res.json({ message: "Success" });
// });
// module.exports = router;


const express = require("express");
const router = express.Router();
const fs = require("fs");
const axios = require("axios");
const { addFilestoIPFS } = require("../ipfs");
const { addBlock } = require("../web3-methods");

// ✅ Flask ML API URL
const FLASK_API_URL = "http://127.0.0.1:3000/predict/auth";

// ✅ Function to store logs locally
const storeLogLocally = (campLocation, logEntry) => {
  const logFilePath = `./${process.env.LOCAL_LOG_FOLDER}/${campLocation}.txt`;
  fs.appendFileSync(logFilePath, logEntry, (err) => {
    if (err) console.error("Error writing to file:", err);
  });

  // Store in a central "All.txt" file
  fs.appendFileSync(`./${process.env.LOCAL_LOG_FOLDER}/All.txt`, logEntry, (err) => {
    if (err) console.error("Error writing to All.txt:", err);
  });
};

// ✅ Route to add a log with ML fraud detection
router.post("/addLog", async (req, res) => {
  try {
    const { logData } = req.body;

    // 🔹 Send log data to Flask ML model for fraud risk prediction
    const mlResponse = await axios.post(FLASK_API_URL, logData);
    const ml_risk_score = mlResponse.data.auth_risk;

    // 🔹 Format log entry
    const logEntry = `${logData.campLocation},${logData.timestamp},${logData.source},${logData.destination},${logData.user},${logData.device},${logData.eventType},${logData.eventDescription},${logData.eventSeverity},${ml_risk_score}\n`;

    // 🔹 Store log locally
    storeLogLocally(logData.campLocation, logEntry);

    res.json({ message: "Log stored successfully", risk_score: ml_risk_score });
  } catch (error) {
    console.error("Error adding log:", error);
    res.status(500).json({ error: "Failed to process log" });
  }
});

// ✅ Route to add multiple logs at once
router.post("/addLogs", (req, res) => {
  try {
    const { logs } = req.body;
    let content = "";

    logs.forEach((logData) => {
      content += `${logData.campLocation},${logData.timestamp},${logData.source},${logData.destination},${logData.user},${logData.device},${logData.eventType},${logData.eventDescription},${logData.eventSeverity},${logData.mlRiskScore}\n`;

      storeLogLocally(logData.campLocation, content);
    });

    res.json({ message: "Logs stored successfully" });
  } catch (error) {
    console.error("Error adding logs:", error);
    res.status(500).json({ error: "Failed to process logs" });
  }
});

// ✅ Route to upload logs to IPFS and store hash on blockchain
router.post("/triggerIPFSBlockChain", async (req, res) => {
  try {
    const locations = ["Delhi", "Mumbai", "Bangalore"];
    const ipfsFiles = locations.map((location) => ({
      path: `${location}.txt`,
      content: fs.readFileSync(`./${process.env.LOCAL_LOG_FOLDER}/${location}.txt`, {
        encoding: "base64",
      }),
    }));

    // 🔹 Upload logs to IPFS
    const ipfsResponse = await addFilestoIPFS(ipfsFiles);
    console.log("IPFS Response:", ipfsResponse);

    // 🔹 Store IPFS hashes in blockchain
    locations.forEach((location, index) => {
      addBlock(ipfsResponse[index].path, location);
    });

    // 🔹 Move logs to the central log storage
    locations.forEach((location) => {
      const logContent = fs.readFileSync(`./${process.env.LOCAL_LOG_FOLDER}/${location}.txt`);
      fs.appendFileSync(`./${process.env.CENTRAL_LOG_FOLDER}/${location}.txt`, logContent);
    });

    // 🔹 Clear local log files
    locations.forEach((location) => {
      fs.writeFileSync(`./${process.env.LOCAL_LOG_FOLDER}/${location}.txt`, "");
    });

    res.json({ message: "Logs uploaded to IPFS and stored in blockchain" });
  } catch (error) {
    console.error("Error in IPFS/Blockchain process:", error);
    res.status(500).json({ error: "Failed to upload logs to IPFS and blockchain" });
  }
});

module.exports = router;
