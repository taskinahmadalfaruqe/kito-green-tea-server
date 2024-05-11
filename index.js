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
    const pendingContactData = client.db("eShopBD").collection('pendingContact');
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
    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const result = await productsCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    })

    // update a  Product data 
    app.patch('/products/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const data = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          productCategory: data.productCategory,
          productName: data.productName,
          regularPrice: data.regularPrice,
          productDetails: data.productDetails,
          discountPrice: data.discountPrice,
          image: data.image,
        },
      };
      const result = await productsCollection.updateOne(filter, updateDoc, options);
      res.send(result)
    })

    //PLACE ORDER
    app.post('/pendingOrderData', async (req, res) => {
      const pendingOrderDataPost = req.body;
      trackOrder = trackOrder + 1;
      const orderData = await pendingOrderCollection.insertOne({ ...pendingOrderDataPost, trackOrder });
      res.send({ orderData, orderID: `${trackOrder}` });
    });

    app.patch('/pendingOrderData/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const data = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          status: "done",
        },
      };
      const result = await pendingOrderCollection.updateOne(filter, updateDoc, options);
      res.send(result)
    })




    // GET ALL PENDING ORDERS
    app.get('/pendingOrderData', async (req, res) => {
      const data = await pendingOrderCollection.find().toArray();
      res.send(data);
    });


    // CONTACT DATA
    app.post('/pendingContact', async (req, res) => {
      const data = req.body;
      const result = await pendingContactData.insertOne(data);
      res.send(result);
    })

    app.get('/pendingContact', async (req, res) => {
      const findData = await pendingContactData.find().toArray();
      res.send(findData);
    })
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
