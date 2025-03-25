const { MongoClient } = require("mongodb");

const uri = "your_mongodb_atlas_connection_string"; // Replace with your actual MongoDB URI

const client = new MongoClient(uri);

let dbConnection;

const connectToServer = async () => {
  try {
    await client.connect();
    dbConnection = client.db("Doctor"); // Make sure the database name is correct
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
};

const getDb = () => {
  if (!dbConnection) {
    throw new Error("Database not initialized. Call connectToServer first.");
  }
  return dbConnection;
};

module.exports = { connectToServer, getDb };