const connectDB = require("./db")
const server = require("express")()
const cors = require("cors")

server.use(cors())
const port = 4000

collectionData = async(name) => {
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