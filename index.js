const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 4000;

app.get("/", (req, res) => {
  res.send("Welcome to ar-creative-agency-server");
});

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ydzqi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  // collections
  const servicesCollection = client
    .db(process.env.DB_NAME)
    .collection("servicesCollection");
  const worksCollection = client
    .db(process.env.DB_NAME)
    .collection("worksCollection");
  const reviewCollection = client
    .db(process.env.DB_NAME)
    .collection("reviewCollection");
  const adminCollection = client
    .db(process.env.DB_NAME)
    .collection("adminCollection");
  const orderCollection = client
    .db(process.env.DB_NAME)
    .collection("orderCollection");

  console.log("dbConnected");
  app.get("/services", (req, res) => {
    servicesCollection.find({}).toArray((err, services) => {
      res.send(services);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
