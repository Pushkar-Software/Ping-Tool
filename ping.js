const ping = require("ping");
const fs = require("fs");

let ipList = require("./ip_list.json");
let statusMap = {};

async function updateStatus() {
  for (let ip of ipList) {
    const res = await ping.promise.probe(ip, { timeout: 1 });
    statusMap[ip] = res.alive ? "Online" : "Offline";
  }
}

function getStatus() {
  return statusMap;
}

// Run on interval
setInterval(updateStatus, 10000); // every 10 sec
updateStatus();

module.exports = { getStatus };
