const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://pet:tESTUASaX2G1k9rH@t-mongo.m4mnwdk.mongodb.net/?appName=T-mongo";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();


    const db= client.db('pets-db')
    const petsuppliessCollection=db.collection('pet-supplies')


    app.get('/petsupplies',async(req,res)=>{
      
      const result=await petsuppliessCollection.find().toArray()
      res.send(result)
    })

    app.post('/petsupplies',async(req,res)=>{

      const data=req.body
      
      const result= await petsuppliessCollection.insertOne(data)
      res.send(result)
    })
    app.get('/petsupplies/:id',async(req,res)=>{
      const {id}=req.params
      // console.log(id);
      const result=await petsuppliessCollection.findOne({_id: new ObjectId(id)})
      res.send(result)
                     
    })

    app.get('/latest-post',async(req,res)=>{
      const result=await petsuppliessCollection.find().sort({date:-1}).limit(6).toArray()
      res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hellow Brother");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
