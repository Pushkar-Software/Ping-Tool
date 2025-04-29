const express = require("express");
const cors = require("cors");
const path = require("path");
const { getStatus } = require("./ping");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

app.get("/status", (req, res) => {
  res.json(getStatus());
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
