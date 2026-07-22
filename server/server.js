require("dotenv").config();

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const applicationRoutes = require("./routes/applicationRoutes");

app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});