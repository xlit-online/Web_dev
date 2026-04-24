const http = require("http");
const fs = require("fs");

const filePath = "./tasks.json";

function getTasks() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function getRequestBody(req, callback) {

}