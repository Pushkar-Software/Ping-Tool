const ping = require("ping");
const fs = require("fs");

let ipList = require("./ip_list.json");
let groupConfig = require("./group_config.json");
let statusMap = {};

async function updateStatus() {
  for (let ip of ipList.map(obj => typeof obj === 'string' ? obj : obj.ip)) {
    const res = await ping.promise.probe(ip, { timeout: 1 });
    statusMap[ip] = statusMap[ip] || {};
    statusMap[ip].status = res.alive ? "Online" : "Offline";
    let ipObj = ipList.find(i => typeof i === 'object' && i.ip === ip);
    if (ipObj && ipObj.location) {
      statusMap[ip].location = ipObj.location;
    }
  }
}

function getStatus() {
  return statusMap;
}

function getStatusByGroup(groupId) {
  const group = groupConfig[groupId];
  if (!group) return null;

  const result = {};
  for (let ip of group.ips) {
    if (statusMap[ip]) result[ip] = statusMap[ip];
  }
  return result;
}

setInterval(updateStatus, 10000);
updateStatus();

module.exports = { getStatus, getStatusByGroup };
