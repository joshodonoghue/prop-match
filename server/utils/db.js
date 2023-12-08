const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://josh37:nehufiFnGOKYjvAG@finalproject.ian7fcq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection to MongoDB failed", error);
    process.exit(1);
  }
};

module.exports = { connectDB, client };
