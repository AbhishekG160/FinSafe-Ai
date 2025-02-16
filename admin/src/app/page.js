// "use client";
// import { Divider } from "@nextui-org/react";
// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   RadialBarChart,
//   RadialBar,
//   Legend,
// } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// export default function Home() {
//   const [logVTime, setLogVTime] = useState([]);
//   const [eventsTypeVTime, setEventsTypeVTime] = useState([]);
//   const [criticalAlertsVTime, setCriticalAlertsVTime] = useState([]);
//   const [criticalAlertGroupByEventType, setCriticalAlertGroupByEventType] =
//     useState([]);
//   const [logCount, setLogCount] = useState(0);
//   const [uniquieSourceCount, setUniquieSourceCount] = useState(0);
//   const [uniquieDestinationCount, setUniquieDestinationCount] = useState(0);
//   const [eventSeverityVTime, setEventSeverityVTime] = useState([]);
//   const [eventSeverityDaily, setEventSeverityDaily] = useState([]);
//   useEffect(() => {
//     const fn = async () => {
//       const response = fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard?threshold=0.7`
//       );
//       response.then(async (r) => {
//         const j = await r.json();
//         setEventsTypeVTime(j.eventTypeVTime);
//         setLogVTime(j.logVTime);
//         setCriticalAlertsVTime(j.criticalAlertsVTime);
//         setCriticalAlertGroupByEventType(j.criticalAlertGroupByEventType);
//         setLogCount(j.logcount);
//         setUniquieSourceCount(j.sourceIP);
//         setUniquieDestinationCount(j.destIP);
//         setEventSeverityVTime(j.eventSeverityVTime);
//         setEventSeverityDaily(j.eventSeverityDaily);
//       });
//     };
//     fn();
//   }, []);

//   return (
//     <>
//       <section className="w-full h-screen flex flex-col gap-8 flex-nowrap">
//         <h3 className="text-2xl underline underline-offset-4 uppercase tracking-widest">
//           Overview
//         </h3>
//         <div className="flex gap-8 h-1/2 flex-nowrap w-full">
//           <div className="w-full h-full flex flex-col items-center gap-2">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart
//                 width={500}
//                 height={300}
//                 data={logVTime}
//                 margin={{
//                   top: 5,
//                   right: 30,
//                   left: 20,
//                   bottom: 5,
//                 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="day" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="count" stroke="#FFD700" />
//               </LineChart>
//             </ResponsiveContainer>
//             <span className="text-lg">Number Of Logs In Past Week</span>
//           </div>
//           <div className="w-full h-full flex flex-col items-center gap-2">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart width={800} height={400}>
//                 <Tooltip />

//                 <Pie
//                   data={eventsTypeVTime}
//                   cx={285}
//                   cy={140}
//                   innerRadius={120}
//                   outerRadius={140}
//                   fill="#8884d8"
//                   dataKey="count"
//                 >
//                   {eventsTypeVTime.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//             <span className="text-lg">
//               Number of Logs In Past Week Grouped By Event Type
//             </span>
//           </div>
//         </div>
//         <div className="w-full h-1/2 flex flex-col items-center gap-2">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart
//               width={500}
//               height={300}
//               data={criticalAlertsVTime}
//               margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="count"
//                 stroke="#FFD700"
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//           <span className="text-lg">Number of Alerts in Past Week</span>
//         </div>
//       </section>
//       <Divider className="my-4" />
//       <section className="w-full h-[60vh] flex flex-col flex-nowrap">
//         <h3 className="text-2xl underline underline-offset-4 uppercase tracking-widest">
//           Alerts
//         </h3>
//         <div className="flex gap-8 h-full flex-nowrap w-full justify-center items-center">
//           <div className="w-1/2 h-full flex flex-col items-center gap-2">
//             <ResponsiveContainer width="100%" height="100%">
//               <RadialBarChart
//                 cx="50%"
//                 cy="50%"
//                 innerRadius="10%"
//                 outerRadius="80%"
//                 barSize={10}
//                 data={criticalAlertGroupByEventType}
//               >
//                 <RadialBar
//                   minAngle={15}
//                   label={{ position: "insideStart", fill: "#fff" }}
//                   dataKey="count"
//                 />
//                 <Tooltip />
//                 <Legend iconSize={10} layout="horizontal" align="center" />
//               </RadialBarChart>
//             </ResponsiveContainer>

//             <span className="text-lg">
//               Number of Alerts Grouped By Event Severity
//             </span>
//           </div>
//           <div className="w-1/2 h-full text-black rounded-3xl bg-[#a4c9f0] flex flex-col items-center justify-start text-2xl">
//             <div className="w-3/4 object-contain">
//               <img src="/alert.png" className="" />
//             </div>
//             <div className="text-3xl font-bold">
//               Number of Alerts Today :{" "}
//               {criticalAlertsVTime.length && criticalAlertsVTime.at(-1).count}
//             </div>
//           </div>
//         </div>
//       </section>
//       <Divider className="my-4" />
//       <section className="w-full h-[50vh] flex flex-col flex-nowrap gap-8">
//         <h3 className="text-2xl underline underline-offset-4 uppercase tracking-widest">
//           Stats
//         </h3>
//         <div className="text-black flex gap-8 h-full flex-nowrap w-full">
//           <div className="w-1/3 h-full rounded-3xl bg-[#a4c9f0] flex flex-col items-center justify-around">
//             <div className="w-3/4 object-contain">
//               <img src="/router.png" className="" />
//             </div>
//             <div className="text-xl font-bold">
//               Log Count in Past 24 hours :{logCount}
//             </div>
//           </div>
//           <div className="w-1/3 h-full rounded-3xl bg-[#a4c9f0] flex flex-col items-center justify-around">
//             <div className="w-3/4 object-contain">
//               <img src="/router.png" className="" />
//             </div>
//             <div className="text-xl font-bold">
//               Unique Source IP (Weekly) : {uniquieSourceCount}
//             </div>
//           </div>
//           <div className="w-1/3 h-full rounded-3xl bg-[#a4c9f0] flex flex-col items-center justify-around">
//             <div className="w-3/4 object-contain ">
//               <img src="/router.png" className="" />
//             </div>
//             <div className="text-xl font-bold">
//               Unique Destination IP (Weekly) : {uniquieDestinationCount}
//             </div>
//           </div>
//         </div>
//       </section>
//       <Divider className="my-4" />
//       <section className="w-full h-[50vh] flex flex-col items-center gap-2">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             width={500}
//             height={300}
//             data={eventSeverityVTime}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="count"
//               stroke="#FFD700"
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//         <span className="text-lg">
//           Number of Logs Grouped By Event Severity in Past Week
//         </span>
//       </section>
//       <Divider className="my-4" />
//       <section className="w-full h-[50vh] flex flex-col items-center gap-2">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             width={500}
//             height={300}
//             data={eventSeverityDaily}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="informational_count"
//               stroke={COLORS[0]}
//               activeDot={{ r: 8 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="warning_count"
//               stroke={COLORS[1]}
//               activeDot={{ r: 8 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="error_count"
//               stroke={COLORS[2]}
//               activeDot={{ r: 8 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="critical_count"
//               stroke={COLORS[3]}
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//         <span className="text-lg">Logs Grouped by Event Severity Daily</span>
//       </section>
//     </>
//   );
// }


// "use client";
// import { Divider } from "@nextui-org/react";
// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   RadialBarChart,
//   RadialBar,
//   Legend,
// } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// export default function Home() {
//   const [logVTime, setLogVTime] = useState([]);
//   const [eventsTypeVTime, setEventsTypeVTime] = useState([]);
//   const [criticalAlertsVTime, setCriticalAlertsVTime] = useState([]);
//   const [criticalAlertGroupByEventType, setCriticalAlertGroupByEventType] = useState([]);
//   const [logCount, setLogCount] = useState(0);
//   const [uniqueSourceCount, setUniqueSourceCount] = useState(0);
//   const [uniqueDestinationCount, setUniqueDestinationCount] = useState(0);

//   useEffect(() => {
//     // Hardcoded Transaction Data
//     const transactionData = [
//       { transactionId: "TXN001", userId: "U001", amount: 500, status: "Success", type: "Credit", currency: "USD" },
//       { transactionId: "TXN002", userId: "U002", amount: 1200, status: "Failed", type: "Debit", currency: "EUR" },
//       { transactionId: "TXN003", userId: "U003", amount: 350, status: "Success", type: "Transfer", currency: "INR" },
//       { transactionId: "TXN004", userId: "U004", amount: 780, status: "Pending", type: "Credit", currency: "GBP" },
//       { transactionId: "TXN005", userId: "U005", amount: 200, status: "Failed", type: "Debit", currency: "CAD" },
//       { transactionId: "TXN006", userId: "U006", amount: 950, status: "Success", type: "Transfer", currency: "USD" },
//       { transactionId: "TXN007", userId: "U007", amount: 1150, status: "Success", type: "Credit", currency: "AUD" },
//       { transactionId: "TXN008", userId: "U008", amount: 300, status: "Failed", type: "Debit", currency: "SGD" },
//       { transactionId: "TXN009", userId: "U009", amount: 420, status: "Pending", type: "Credit", currency: "INR" },
//       { transactionId: "TXN010", userId: "U010", amount: 800, status: "Success", type: "Transfer", currency: "USD" },
//     ];

//     // Hardcoded Authentication & Access Data
//     const authData = [
//       { userId: "U001", ip: "192.168.1.1", geolocation: "Delhi, India", device: "Windows", mfa: "Enabled", access: "Granted" },
//       { userId: "U002", ip: "192.168.1.2", geolocation: "Mumbai, India", device: "MacOS", mfa: "Disabled", access: "Denied" },
//       { userId: "U003", ip: "192.168.1.3", geolocation: "Bangalore, India", device: "Linux", mfa: "Enabled", access: "Granted" },
//       { userId: "U004", ip: "192.168.1.4", geolocation: "Pune, India", device: "iOS", mfa: "Enabled", access: "Granted" },
//       { userId: "U005", ip: "192.168.1.5", geolocation: "Hyderabad, India", device: "Android", mfa: "Disabled", access: "Denied" },
//     ];

//     setLogVTime(transactionData);
//     setEventsTypeVTime(authData);
//     setCriticalAlertsVTime(transactionData.slice(0, 5));
//     setCriticalAlertGroupByEventType(authData.slice(0, 5));
//     setLogCount(transactionData.length);
//     setUniqueSourceCount(authData.length);
//     setUniqueDestinationCount(authData.length);
//   }, []);

//   return (
//     <>
//       <section className="w-full h-screen flex flex-col gap-8">
//         <h3 className="text-2xl underline uppercase tracking-widest">Overview</h3>
//         <div className="flex gap-8 h-1/2 w-full">
//           <div className="w-full h-full flex flex-col items-center">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart width={500} height={300} data={logVTime}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="transactionId" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="amount" stroke="#FFD700" />
//               </LineChart>
//             </ResponsiveContainer>
//             <span className="text-lg">Transaction Amounts</span>
//           </div>
//         </div>
//       </section>

//       <Divider className="my-4" />
//       <section className="w-full h-[50vh] flex flex-col items-center">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart width={800} height={400}>
//             <Tooltip />
//             <Pie data={eventsTypeVTime} cx={285} cy={140} innerRadius={120} outerRadius={140} dataKey="access">
//               {eventsTypeVTime.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//         <span className="text-lg">Authentication Access Results</span>
//       </section>

//       <Divider className="my-4" />
//       <section className="w-full h-[50vh] flex flex-col items-center">
//         <ResponsiveContainer width="100%" height="100%">
//           <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={criticalAlertsVTime}>
//             <RadialBar minAngle={15} label={{ position: "insideStart", fill: "#fff" }} dataKey="amount" />
//             <Tooltip />
//             <Legend iconSize={10} layout="horizontal" align="center" />
//           </RadialBarChart>
//         </ResponsiveContainer>
//         <span className="text-lg">Critical Transactions</span>
//       </section>

//       <Divider className="my-4" />
//       <section className="w-full h-[50vh] flex flex-col items-center">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart width={500} height={300} data={criticalAlertGroupByEventType}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="ip" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="userId" stroke="#FFD700" />
//           </LineChart>
//         </ResponsiveContainer>
//         <span className="text-lg">User Authentication Analysis</span>
//       </section>
//     </>
//   );
// }

// "use client";
// import { Divider } from "@nextui-org/react";
// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   RadialBarChart,
//   RadialBar,
//   Legend,
// } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// export default function Home() {
//   const [logVTime, setLogVTime] = useState([]);
//   const [eventsTypeVTime, setEventsTypeVTime] = useState([]);
//   const [criticalAlertsVTime, setCriticalAlertsVTime] = useState([]);
//   const [criticalAlertGroupByEventType, setCriticalAlertGroupByEventType] = useState([]);
//   const [logCount, setLogCount] = useState(0);
//   const [uniqueSourceCount, setUniqueSourceCount] = useState(0);
//   const [uniqueDestinationCount, setUniqueDestinationCount] = useState(0);

//   useEffect(() => {
//     // Hardcoded Transaction Data
//     const transactionData = [
//       { transactionId: "TXN001", userId: "U001", amount: 500, status: "Success", currency: "USD" },
//       { transactionId: "TXN002", userId: "U002", amount: 1200, status: "Failed", currency: "EUR" },
//       { transactionId: "TXN003", userId: "U003", amount: 350, status: "Success", currency: "INR" },
//       { transactionId: "TXN004", userId: "U004", amount: 780, status: "Pending", currency: "GBP" },
//     ];

//     // Hardcoded Authentication & Access Data
//     const authData = [
//       { userId: "U001", ip: "192.168.1.1", geolocation: "Delhi, India", access: "Granted" },
//       { userId: "U002", ip: "192.168.1.2", geolocation: "Mumbai, India", access: "Denied" },
//       { userId: "U003", ip: "192.168.1.3", geolocation: "Bangalore, India", access: "Granted" },
//     ];

//     setLogVTime(transactionData);
//     setEventsTypeVTime(authData);
//     setCriticalAlertsVTime(transactionData.slice(0, 4));
//     setCriticalAlertGroupByEventType(authData.slice(0, 3));
//     setLogCount(transactionData.length);
//     setUniqueSourceCount(authData.length);
//     setUniqueDestinationCount(authData.length);
//   }, []);

//   return (
//     <>
//       <section className="w-full h-screen flex flex-col gap-8">
//         <h3 className="text-2xl underline uppercase tracking-widest">Overview</h3>
//         <div className="flex gap-8 h-1/2 w-full">
//           <div className="w-full h-full flex flex-col items-center">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart width={500} height={300} data={logVTime}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="transactionId" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="amount" stroke="#FFD700" />
//               </LineChart>
//             </ResponsiveContainer>
//             <span className="text-lg">Transaction Amounts</span>
//           </div>
//         </div>
//       </section>

//       <Divider className="my-4" />
//       <section className="w-full h-[50vh] flex flex-col items-center">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart width={800} height={400}>
//             <Tooltip />
//             <Pie
//               data={eventsTypeVTime}
//               cx={285}
//               cy={140}
//               innerRadius={120}
//               outerRadius={140}
//               fill="#8884d8"
//               dataKey="access"
//             >
//               {eventsTypeVTime.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//         <span className="text-lg">Authentication Access Results</span>
//       </section>

//       <Divider className="my-4" />
//       <section className="w-full h-[50vh] flex flex-col items-center">
//         <ResponsiveContainer width="100%" height="100%">
//           <RadialBarChart
//             cx="50%"
//             cy="50%"
//             innerRadius="20%"
//             outerRadius="90%"
//             barSize={20}
//             data={criticalAlertsVTime}
//           >
//             <RadialBar
//               minAngle={15}
//               label={{ position: "insideStart", fill: "#fff", fontSize: 14 }}
//               dataKey="amount"
//               fill="#FFD700"
//             />
//             <Tooltip />
//             <Legend iconSize={10} layout="horizontal" align="center" />
//           </RadialBarChart>
//         </ResponsiveContainer>
//         <span className="text-lg">Critical Transactions</span>
//       </section>

//       <Divider className="my-4" />
//       <section className="w-full h-[50vh] flex flex-col items-center">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart width={500} height={300} data={criticalAlertGroupByEventType}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="ip" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="userId" stroke="#FFD700" />
//           </LineChart>
//         </ResponsiveContainer>
//         <span className="text-lg">User Authentication Analysis</span>
//       </section>
//     </>
//   );
// }


"use client";
import { Divider, Input, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Home() {
  const [logVTime, setLogVTime] = useState([]);
  const [eventsTypeVTime, setEventsTypeVTime] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filteredAuth, setFilteredAuth] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const transactionData = [
      { transactionId: "TXN001", userId: "U001", amount: 500, status: "Success", currency: "USD" },
      { transactionId: "TXN002", userId: "U002", amount: 1200, status: "Failed", currency: "EUR" },
      { transactionId: "TXN003", userId: "U003", amount: 350, status: "Success", currency: "INR" },
      { transactionId: "TXN004", userId: "U004", amount: 780, status: "Pending", currency: "GBP" },
    ];

    const authData = [
      { userId: "U001", ip: "192.168.1.1", geolocation: "Delhi, India", access: "Granted" },
      { userId: "U002", ip: "192.168.1.2", geolocation: "Mumbai, India", access: "Denied" },
      { userId: "U003", ip: "192.168.1.3", geolocation: "Bangalore, India", access: "Granted" },
    ];

    setLogVTime(transactionData);
    setEventsTypeVTime(authData);
    setFilteredTransactions(transactionData);
    setFilteredAuth(authData);
  }, []);

  const handleSearch = () => {
    const filteredTxns = logVTime.filter((txn) =>
      txn.transactionId.includes(search) ||
      txn.userId.includes(search) ||
      txn.status.includes(search) ||
      txn.currency.includes(search)
    );

    const filteredAuths = eventsTypeVTime.filter((auth) =>
      auth.userId.includes(search) ||
      auth.ip.includes(search) ||
      auth.geolocation.includes(search) ||
      auth.access.includes(search)
    );

    setFilteredTransactions(filteredTxns);
    setFilteredAuth(filteredAuths);
  };

  return (
    <>
      <div className="flex gap-4 mb-6">
        <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <section className="w-full h-screen flex flex-col gap-8">
        <h3 className="text-2xl underline uppercase tracking-widest">Overview</h3>
        <div className="flex gap-8 h-1/2 w-full">
          <div className="w-full h-full flex flex-col items-center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={500} height={300} data={filteredTransactions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="transactionId" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#FFD700" />
              </LineChart>
            </ResponsiveContainer>
            <span className="text-lg">Filtered Transactions</span>
          </div>
        </div>
      </section>

      <Divider className="my-4" />
      <section className="w-full h-[50vh] flex flex-col items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={800} height={400}>
            <Tooltip />
            <Pie
              data={filteredAuth}
              cx={285}
              cy={140}
              innerRadius={120}
              outerRadius={140}
              fill="#8884d8"
              dataKey="access"
            >
              {filteredAuth.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <span className="text-lg">Filtered Authentication Access</span>
      </section>
    </>
  );
}
