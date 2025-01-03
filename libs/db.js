const { MongoClient } = require('mongodb');
require("dotenv").config()
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.DATABASE_URL;
const client = new MongoClient(url);

// Database Name
const dbName = 'likedin-clone-db';

const mainDB = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to mongodb');
  const db = client.db(dbName);

  // the following code examples can be pasted here...

  return db;
}

module.exports = {mainDB}