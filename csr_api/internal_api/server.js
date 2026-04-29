const http = require("http");
const router = require("./router");

require("dotenv").config(); // load .env variables
const connectDB = require("./config/db"); // MongoDB connection function
        
const PORT = process.env.PORT || 3000;

// connect to MongoDB first
connectDB();

const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});