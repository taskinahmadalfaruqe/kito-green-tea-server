
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
// var jwt = require('jsonwebtoken');


// middleware 
app.use(cors())
app.use(express.json());

// user = e-shop-bd
// pass= UBShkNROi2oq4o2p


const uri = "mongodb+srv://e-shop-bd:UBShkNROi2oq4o2p@cluster0.1gxcng8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('e-shop-bd server is running.....')
})

app.listen(port, () => {
    console.log(`e-shop-bd Server is running on port : ${port}`)
})