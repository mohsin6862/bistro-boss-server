const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 3000;


// middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@mohsin.hrlaneq.mongodb.net/?retryWrites=true&w=majority`;

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
                                  

     const menuCollection = client.db("bistroBossBD").collection("menuDB")
     const cartCollection = client.db("bistroBossBD").collection("cartDB")
     const reviewCollection = client.db("bistroBossBD").collection("reviewDB")

     app.get('/menu',async(req,res)=>{
        const result= await menuCollection.find().toArray()
        res.send(result)
     })

     app.get('/review',async(req,res)=>{
      const result = await reviewCollection.find().toArray()
      res.send(result)
     })

     app.post('/cart', async(req,res)=>{
      const item = req.body;
      const result = await cartCollection.insertOne(item);
      res.send(result)
     })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Bistro Boss is comming')

})

app.listen(port ,()=>{
    console.log(`Bistro Boss is comming on ${port}`)
})