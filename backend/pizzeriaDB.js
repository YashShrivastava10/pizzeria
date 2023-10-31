
import connectDB from "./db.js"
import express from "express"
import cors from "cors"
const server = express()

server.use(cors())

const port = 4000

const collectionData = async (name) => {
  const data = await connectDB()
  const collection = data.collection(name)
  return await collection.find().toArray()
}

server.get("/pizza", async (req, res) => {
  try {
    const data = await collectionData("pizza");
    res.send(data);
  } catch (error) {
    console.error("Error fetching pizza data:", error); // Add this line for debugging
    res.status(500).send("Internal Server Error");
  }
});

server.get("/ingredients", async (req, res) => {
  try {
    const data = await collectionData("ingredients");
    res.send(data);
  } catch (error) {
    console.error("Error fetching ingredients data:", error); // Add this line for debugging
    res.status(500).send("Internal Server Error");
  }
});

server.post("/signUp", async (req, res) => {
  try {
    let data = await connectDB()
    const collection = data.collection("users")
    const { name, email, pass } = req.query
    data = await collection.find({ email: email }).toArray()
    if (data.length === 0) {
      const result = await collection.insertOne({ name, email, password: pass })
      console.log(result);
      if (result.acknowledged) return res.status(200).send({ success: true, message: "Sign In Successfull" })
      else return res.status(200).send({ success: false, message: "Sign In Failed" })
    }
    else return res.status(200).send({ success: false, message: "Email Id already Exist" })
  }
  catch(error){
    console.error("Error sigin:", error); // Add this line for debugging
    res.status(500).send({ message: error });
  }
})

server.post("/login", async (req, res) => {
  try {
    let data = await connectDB()
    const collection = data.collection("users")
    const { email, pass } = req.query
    data = await collection.find({ email: email }).toArray()
    if (data.length === 0) return res.status(200).send({ success: false, message: "Email Id doest not exist", data: {} })
    if (data[0].password === pass) return res.status(200).send({ success: true, message: "Login Successfull", data: data[0] })
    return res.status(200).send({ success: false, message: "Incorrect Password", data: {} })
  } catch (error) {
    console.error("Error login:", error); // Add this line for debugging
    res.status(500).send({ message: error });
  }
})

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