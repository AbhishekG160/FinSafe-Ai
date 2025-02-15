// // SPDX-License-Identifier: GPL-3.0

// pragma solidity ^0.8.0;


// contract logFileStorage{
//     struct data{
//         string ipfsHash;
//         uint timestamp;
//         string campLocation;
//     }
//     data[] public DATA;
//     function setter(string memory ip,string memory camp)public {
//         data memory newData = data({
//             ipfsHash: ip,
//             timestamp: block.timestamp,
//             campLocation: camp
//         });
//         DATA.push(newData);

//     }
//     function getter()public view returns(data[] memory){
//         return DATA;
//     }
// }

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract LogFileStorage {
    struct LogData {
        string ipfsHash;
        uint256 timestamp;
        string campLocation;
        address uploader;
    }

    LogData[] public logList;  // Stores logs

    event LogAdded(uint256 indexed logIndex, string ipfsHash, uint256 timestamp, string campLocation, address uploader);

    function addLog(string memory ipfsHash, string memory campLocation) public returns (uint256) {
        LogData memory newLog = LogData({
            ipfsHash: ipfsHash,
            timestamp: block.timestamp,
            campLocation: campLocation,
            uploader: msg.sender
        });

        logList.push(newLog);
        uint256 logIndex = logList.length - 1;

        emit LogAdded(logIndex, ipfsHash, block.timestamp, campLocation, msg.sender);
        return logIndex;
    }

    function getAllLogs() public view returns (LogData[] memory) {
        return logList;
    }

    function getLogByIndex(uint256 index) public view returns (string memory, uint256, string memory, address) {
        require(index < logList.length, "Log does not exist.");
        LogData memory log = logList[index];
        return (log.ipfsHash, log.timestamp, log.campLocation, log.uploader);
    }

    function getTotalLogs() public view returns (uint256) {
        return logList.length;
    }
}
