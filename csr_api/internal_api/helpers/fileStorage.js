const fs = require("fs");

const filePath = "./db.json";

function readData() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data ? JSON.parse(data) : { todos: [] };
  } catch (err) {
    return { todos: [] };
  }
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { readData, writeData };