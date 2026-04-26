const http = require("http");
const router = require("./router");

const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, () => {
  console.log("Server is running on port 3000");
});