const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const port = 3000
const app = express()
const {MongoClient} = require('mongodb')
const mongourl = "mongodb://localhost:27017/"
const client = new MongoClient(mongourl)
client.connect();


app.use(bodyParser.json())

const database = "SampleDb"
const db = client.db(database)
app.use(cors())

app.get("/",async (req, res)=>{
  const collection = db.collection('Data')
  const getResult = await collection.find({}).toArray()
  res.json(getResult)
})
app.post("/",async (req, res)=>{
  const collection = db.collection('Data')
  const password = req.body;
  const getResult = await collection.insertOne(password)
  res.json({success:true})
})
app.delete("/",async (req, res)=>{
  const collection = db.collection('Data')
  const password = req.body;
  const getResult = await collection.deleteOne(password)
  res.send("Data Deleted Successfully")
})

app.listen(port, ()=>{
  console.log(`Example is is listen at ${port}`)
})