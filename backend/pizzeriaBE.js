
import connectDB from "./db.js"
import express from "express"
import cors from "cors"
const server = express()

server.use(cors({
  origin: ["https://pizzeria-psi.vercel.app"],
  credentials: true
}))
const port = 4000

const collectionData = async(name) => {
  const data = await connectDB()
  const collection = await data.collection(name)
  return await collection.find().toArray()
}

server.get("/pizza", async(req, res) => {
  const data = await collectionData("pizza")
  res.send(data)
})

server.get("/users", async(req, res) => {
  const data = await collectionData("users")
  res.send(data)
})

server.listen(port, () => console.log(`Server running at port ${port}`))