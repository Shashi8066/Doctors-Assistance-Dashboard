const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToServer() {
  await client.connect();
  db = client.db("Doctor"); // Ensure this matches your database name
  console.log("Connected to MongoDB");
}

function getDb() {
  if (!db) throw new Error("Database not initialized");
  return db;
}

module.exports = { connectToServer, getDb };