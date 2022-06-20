require("dotenv").config();

const app = require("express")();

app.set("view engine", "ejs");

const { MongoClient } = require("mongodb");

const port = process.env.PORT || 5000;

app.use(async (req, res) => {
  const url =
    "mongodb+srv://NOT_MY_USERNAME:NOT_MY_PASSWORD@NOT_MY_DB.knkja.mongodb.net/DB?retryWrites=true&w=majority";
  const client = new MongoClient(url);

  await client.connect();

  const col = client.db("DB").collection("logs");
  const findResult = await col.find({}).toArray();

  findResult.sort((a, b) => parseFloat(b.timestamp) - parseFloat(a.timestamp));

  await client.close();

  res.render("index", { logs: findResult });
});

app.listen(port);
