const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");
require("dotenv").config();
const serviceAccount = require("./pet-key.json");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@t-mongo.m4mnwdk.mongodb.net/?appName=T-mongo`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({
      message: "unauthorized access",
    });
  }
  const token = authorization.split(" ")[1];

  try {
    await admin.auth().verifyIdToken(token);

    next();
  } catch (error) {
    res.status(401).send({
      message: "unauthorized access",
    });
  }
};

async function run() {
  try {
    // await client.connect();

    const db = client.db("pets-db");
    const petsuppliessCollection = db.collection("pet-supplies");
    const ordercollection = db.collection("my-orders");
    const contactCollection = db.collection("contacts");

    app.get("/petsupplies", async (req, res) => {
      const result = await petsuppliessCollection.find().toArray();
      res.send(result);
    });

    app.post("/petsupplies", async (req, res) => {
      const data = req.body;

      const result = await petsuppliessCollection.insertOne(data);
      res.send(result);
    });
    app.get("/petsupplies/:id", async (req, res) => {
      const { id } = req.params;
      // console.log(id);
      const result = await petsuppliessCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.get("/latest-post", async (req, res) => {
      const result = await petsuppliessCollection
        .find()
        .sort({ date: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });
    app.get("/pets", async (req, res) => {
      const result = await petsuppliessCollection
        .find({ category: "Pets" })
        .toArray();
      res.send(result);
    });
    app.get("/petsfood", async (req, res) => {
      const result = await petsuppliessCollection
        .find({ category: "Pet Food" })
        .toArray();
      res.send(result);
    });
    app.get("/petsaccessories", async (req, res) => {
      const result = await petsuppliessCollection
        .find({ category: "Accessories" })
        .toArray();
      res.send(result);
    });
    app.get("/petsproducts", async (req, res) => {
      const result = await petsuppliessCollection
        .find({ category: "Pet Care Products" })
        .toArray();
      res.send(result);
    });
    app.put("/petsupplies/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const FindId = new ObjectId(id);
      const filter = { _id: FindId };
      const update = {
        $set: data,
      };
      const result = await petsuppliessCollection.updateOne(filter, update);
      res.send(result);
    });

    app.delete("/petsupplies/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const FindId = new ObjectId(id);
      const filter = { _id: FindId };
      const result = await petsuppliessCollection.deleteOne(filter);
      res.send(result);
    });

    app.get("/search", async (req, res) => {
      const search_text = req.query.search;
      const result = await petsuppliessCollection
        .find({ name: { $regex: search_text, $options: "i" } })
        .toArray();
      res.send(result);
    });

    app.get("/my-listing", verifyToken, async (req, res) => {
      const email = req.query.email;
      const result = await petsuppliessCollection
        .find({ email: email })
        .toArray();
      res.send(result);
    });

    app.post("/my-orders", async (req, res) => {
      const data = req.body;
      const result = await ordercollection.insertOne(data);
      res.send(result);
    });
    app.get("/my-orders", verifyToken, async (req, res) => {
      const email = req.query.email;
      const result = await ordercollection
        .find({ ordered_by: email })
        .toArray();
      res.send(result);
    });

    app.delete("/my-orders/:id", verifyToken, async (req, res) => {
      const { id } = req.params;

      const result = await ordercollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.post("/contacts", async (req, res) => {
      const data = req.body;
      const result = await contactCollection.insertOne(data);
      res.send(result);
    });

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
