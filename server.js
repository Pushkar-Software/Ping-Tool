const express = require("express");
const cors = require("cors");
const path = require("path");
const { getStatus, getStatusByGroup } = require("./ping");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

app.get("/status", (req, res) => {
  res.json(getStatus());
});

app.get("/status/:groupId", (req, res) => {
  const data = getStatusByGroup(req.params.groupId);
  if (!data) {
    return res.status(404).json({ error: "Group not found" });
  }
  res.json(data);
});

app.get("/share/:groupId", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "share.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
