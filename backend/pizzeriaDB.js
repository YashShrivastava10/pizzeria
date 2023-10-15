
import connectDB from "./db.js"
import express from "express"
import cors from "cors"
const server = express()

server.use(cors())

const port = 4000

const collectionData = async(name) => {
  const data = await connectDB()
  const collection = data.collection(name)
  return await collection.find().toArray()
}

server.get("/", (req, res) => res.send("Hello"))

server.get("/pizza", async (req, res) => {
  try {
    const data = await collectionData("pizza");
    res.send(data);
  } catch (error) {
    console.error("Error fetching pizza data:", error); // Add this line for debugging
    res.status(500).send("Internal Server Error");
  }
});

server.get("/users", async (req, res) => {
  try {
    const data = await collectionData("users");
    res.send(data);
  } catch (error) {
    console.error("Error fetching users data:", error); // Add this line for debugging
    res.status(500).send("Internal Server Error");
  }
})

server.listen(port, () => console.log(`Server running at port ${port}`))