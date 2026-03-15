const { MongoClient } = require("mongodb");

let client;
let db;

const getMongoUri = () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set in the environment.");
  }
  return uri;
};

const connectToMongo = async () => {

  if (db) {
    return db;
  }

  const uri = getMongoUri();
  client = new MongoClient(uri);

  await client.connect();
  const dbName = process.env.MONGODB_DB;

  if (dbName) {
    db = client.db(dbName);
  } else {
    db = client.db();
  }
  return db;
};

const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectToMongo() first.");
  }
  return db;
};

const closeMongo = async () => {
  if (client) {
    await client.close();
    client = undefined;
    db = undefined;
  }
};

module.exports = {
  connectToMongo,
  getDb,
  closeMongo
};
