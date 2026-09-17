const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "task-manager-api"
  });
});

app.use("/api/tasks", taskRoutes);

module.exports = app;