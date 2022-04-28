const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// from mongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8bfbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Async function
async function run() {
  try {
    await client.connect();
    const volunteerCollection = client.db("redOnion").collection("volunteer");

    app.get("/volunteer", async (req, res) => {
      const query = {};
      const cursor = volunteerCollection.find(query);
      const volunteers = await cursor.toArray();
      res.send(volunteers);
    });

    app.get('/volunteer/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const volunteer = await volunteerCollection.findOne(query);
      res.send(volunteer);
    })
  } finally {
  }
}
run().catch(console.dir);

// ROOT API
app.get("/", (req, res) => {
  res.send("Running Red Onion Server");
});

// ROOT Listen || Connected to ROOT API
app.listen(port, () => {
  console.log("Listening to port", port);
});


