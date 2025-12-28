// const express = require("express");
// const app = express();
// const path = require("path");
// const MongoClient = require("mongodb").MongoClient;

// const PORT = 5050;
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

//  const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";
// const client = new MongoClient(MONGO_URL);

// //GET all users
// app.get("/getusers", async (req, res) => {
//     await client.connect(URL);
//     console.log('Connected successfully to server');

//     const db = client.db("apnacollege-db");
//     const data = await db.collection('users').find({}).toArray();
    
//     client.close();
//     res.send(data);
// });

// //POST new user
// app.post("/addUser", async (req, res) => {
//     const userObj = req.body;
//     console.log(req.body);
//     await client.connect(URL);
//     console.log('Connected successfully to server');

//     const db = client.db("apnacollege-db");
//     const data = await db.collection('users').insertOne(userObj);
//     console.log(data);
//     console.log("data inserted in DB");
//     client.close();
// });


// app.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`);
// });

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5050;

const MONGO_URL = process.env.MONGO_URL;
  // process.env.MONGO_URL ||
  // "mongodb://admin:qwerty@mongo:27017/apnacollege-db?authSource=admin";


const client = new MongoClient(MONGO_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ✅ Connect using Promises (NO await)
client.connect()
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

app.get("/getusers", (req, res) => {
  const db = client.db("apnacollege-db");

  db.collection("users").find({}).toArray()
    .then(users => res.json(users))
    .catch(err => res.status(500).send(err.message));
});

app.post("/addUser", (req, res) => {
  const db = client.db("apnacollege-db");

  db.collection("users").insertOne(req.body)
    .then(() => res.send("User added"))
    .catch(err => res.status(500).send(err.message));
});







