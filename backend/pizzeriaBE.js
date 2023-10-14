const connectDB = require("./db")
const server = require("express")()
const port = 4000

server.get("/pizza", async(req, res) => {
  let data = await connectDB()
  const collection = await data.collection("pizza")
  data = await collection.find().toArray()
  console.log(data);
  res.send(data)
})

server.listen(port, () => console.log(`Server running at port ${port}`))