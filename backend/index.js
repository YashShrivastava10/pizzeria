
import connectDB from "./db.js"
import express from "express"
import cors from "cors"
const server = express()

server.use(cors({
  "origin": ["http://localhost:3000"],
  "credentials": true
}))

const port = 4000

const collectionData = async(name) => {
  const data = await connectDB()
  const collection = await data.collection(name)
  return await collection.find().toArray()
}

server.get("/", (req, res) => res.send("Hello"))
server.get("/pizza", async (req, res) => {
  res.send("Pizza Details")
  // try {
  //   const data = await collectionData("pizza");
  //   console.log("Pizza data:", data); // Add this line for debugging
  //   res.send(data);
  // } catch (error) {
  //   console.error("Error fetching pizza data:", error); // Add this line for debugging
  //   res.status(500).send("Internal Server Error");
  // }
});

server.get("/users", async (req, res) => {
  try {
    const data = await collectionData("users");
    console.log("Users data:", data); // Add this line for debugging
    res.send(data);
  } catch (error) {
    console.error("Error fetching users data:", error); // Add this line for debugging
    res.status(500).send("Internal Server Error");
  }
})

server.listen(port, () => console.log(`Server running at port ${port}`))