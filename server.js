require("dotenv").config();

const express = require("express");
const app = express();

const { connectToMongo, closeMongo } = require("./data/dbconnect");
const professionalRouter = require("./routes/professional");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/professional", professionalRouter);
app.use("/data", professionalRouter);

const startServer = async () => {
  await connectToMongo();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

const shutdown = async () => {
  await closeMongo();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
