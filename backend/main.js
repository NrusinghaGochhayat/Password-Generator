const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require("body-parser")

const { MongoClient } = require("mongodb")
const mongoUrl = "mongodb://localhost:27017/"
const client = new MongoClient(mongoUrl)
client.connect();

const database = "passwordBase"
const db = client.db(database)
app.use(bodyParser.json())


app.get("/", async (req, res) => {
    const collection = db.collection("myPassword")
    const result = await collection.find({}).toArray();
    res.json(result)
})

app.post("/", async (req, res) => {
    const password = req.body;
    const collection = db.collection("myPassword")
    const result = await collection.insertOne(password)
    res.send({success: true})

})

app.listen(port, () => {
    console.log(`App is listen on ${port}`)
})
