import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { addNumberofLogstoDatabase, generateRandomLog } from "../utils";
import * as data from "../data";

export default function CreateNlogs() {
  const [number, setNumber] = useState(1);
  const [campLocation, setCampLocation] = useState("");
  const [logs, setLogs] = useState([]);

  // Function to generate N logs
  const generateLogs = () => {
    let newLogs = [];
    for (let i = 0; i < number; i++) {
      newLogs.push(generateRandomLog(campLocation));
    }
    setLogs(newLogs);
  };

  // Function to send logs to backend
  const sendLogsToBackend = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/add-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logs })
      });

      const data = await response.json();
      alert(`✅ Successfully added ${logs.length} logs!`);
    } catch (error) {
      console.error("Error adding logs:", error);
      alert("❌ Error adding logs");
    }
  };

  return (
    <div  style={{
      backgroundImage: "linear-gradient(135deg, #1D112C, #B397D8)",
    }} className="max-w-[900px] mx-auto flex flex-col gap-8  p-6 rounded-lg shadow-lg">
      <div className="text-2xl uppercase underline text-center w-full">Add Random Logs</div>

      {/* Number of Logs */}
      <div className="flex gap-8 items-center justify-between">
        <span className="min-w-fit">Number of Logs: </span>
        <div className="max-w-[400px] w-full">
          <Input
            type="number"
            label="Enter number of logs"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
      </div>

      {/* Camp Location */}
      <div className="flex gap-8 items-center justify-between">
        <span className="min-w-fit">Geo Location: </span>
        <div className="max-w-[400px] w-full">
          <Select label="Select Camp Location" onChange={(e) => setCampLocation(e.target.value)}>
            {data.campLocation.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Generate & Add Logs */}
      <div className="flex justify-center pt-8 gap-4">
        <Button color="secondary" onClick={generateLogs}>
          Generate {number} Logs
        </Button>
        <Button color="secondary" onClick={sendLogsToBackend} disabled={logs.length === 0}>
          Add {logs.length} Logs to Database
        </Button>
      </div>

      {/* Show Generated Logs */}
      {logs.length > 0 && (
        <div className="mt-6 p-4 bg-black rounded-lg shadow">
          <h3 className="text-lg font-bold">Generated Logs:</h3>
          <pre className="text-sm bg-black-10 p-2 rounded">{JSON.stringify(logs, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
