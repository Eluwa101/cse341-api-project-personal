require("dotenv").config();
const express = require("express");
const app = express();

const { connectToMongo, closeMongo } = require("./data/dbconnect");
const professionalRouter = require("./routes/professional");
const contactsRouter = require("./routes/contacts");
const swaggerRouter = require("./routes/swagger");

const PORT = process.env.PORT || 8080;

// Access Control Headers for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
  next();
});

app.use(express.json());
app.use("/contacts", contactsRouter);
app.use("/professional", professionalRouter);
app.use("/", swaggerRouter);

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
