// // user = e-shop-bd
// // pass= UBShkNROi2oq4o2p

// // SbqShhMkstQwducO
// // taskinahmadalfaruqe




const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//CORS CONFIG FILE
const corsConfig = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://e-shopbd-server.vercel.app/',
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}

// middleware 
app.use(cors())
app.use(express.json());

// const uri = "mongodb+srv://taskinahmadalfaruqe:SbqShhMkstQwducO@cluster0.5tob3mx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri = "mongodb+srv://e-shop-bd:UBShkNROi2oq4o2p@cluster0.1gxcng8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let trackOrder = 1000;

async function run() {
  try {
    // await client.connect();
    const productsCollection = client.db("eShopBD").collection("products");
    const pendingOrderCollection = client.db("eShopBD").collection("pendingOrder");
    const deliverOrder = client.db("eShopBD").collection('deliver');
    const contactUS = client.db("eShopBD").collection('ContactUS');
    const solveContactUS = client.db("eShopBD").collection('solveContact');

    //GET PRODUCTS
    app.post('/products', async (req, res) => {
      const newProduct = req.body
      const result = await productsCollection.insertOne(newProduct);
      res.send({ result, message: "User Added In Database" });
    })

    app.get('/products', async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    })

    //PLACE ORDER
    app.post('/pendingOrderData', async (req, res) => {
      const pendingOrderDataPost = req.body;
      trackOrder = trackOrder + 1;
      const orderData = await pendingOrderCollection.insertOne({ ...pendingOrderDataPost, trackOrder });
      res.send({ orderData, orderID: `${trackOrder}` });
    });
    // GET ALL PENDING ORDERS
    app.get('/pendingOrderData', async (req, res) => {
      const data = await pendingOrderCollection.find().toArray();
      res.send(data);
    });


  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('e-shop-bd server is running.....')
})

app.listen(port, () => {
  console.log(`e-shop-bd Server is running on port : ${port}`)
});
