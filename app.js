require("dotenv").config();

const { MongoClient } = require("mongodb");

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/", async (req, res) => {
  const url =
    "mongodb+srv://NOT_MY_USERNAME:NOT_MY_PASSWORD@NOT_MY_DB.knkja.mongodb.net/DB?retryWrites=true&w=majority";
  const client = new MongoClient(url);

  await client.connect();

  const col = client.db("DB").collection("logs");
  const findResult = await col.find({}).toArray();

  findResult.sort((a, b) => parseFloat(b.timestamp) - parseFloat(a.timestamp));

  await client.close();

  res.render(path.join(__dirname, "/index.html"), { logs: findResult });
});

app.listen(port, (req, res) =>
  console.log(`Running on http://localhost:${port}`)
);
