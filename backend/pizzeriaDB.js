import connectDB from "./db.js"
import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"

const server = express()

server.use(cors())

const port = 4000
const saltRounds = 10

const encrypt = async(pass) => {
  try{
    const hash = await bcrypt.hash(pass, saltRounds)
    return hash
  }
  catch(error){
    console.log("Can't encrypt");
    throw error
  }
}

const verifyPassword = async(typedPassword, userPassword) => {
  try{
    const isMatch = await bcrypt.compare(typedPassword, userPassword) // First argument should be non-hashed
    if(isMatch) return true
    return false
  }
  catch(error){
    console.log("Can't decrypt");
    throw error
  }
}

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
    console.error("Error fetching pizza data:", error);
    res.status(500).send("Internal Server Error");
  }
});

server.get("/ingredients", async (req, res) => {
  try {
    const data = await collectionData("ingredients");
    res.send(data);
  } catch (error) {
    console.error("Error fetching ingredients data:", error);
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
      const hash = await encrypt(pass)
      const result = await collection.insertOne({ name, email, password: hash })

      if(result.acknowledged) return res.status(200).send({ success: true, message: "Sign In Successfull" })
      else return res.status(200).send({ success: false, message: "Sign In Failed" })
    }
    else return res.status(200).send({ success: false, message: "Email Id already Exist" })
  }
  catch(error){
    console.error("Error sigin:", error);
    res.status(500).send({ message: error });
  }
})

server.post("/login", async (req, res) => {
  try {
    let data = await connectDB()
    const collection = data.collection("users")

    const { email, pass } = req.query

    data = await collection.findOne({ email: email })

    if (!data) return res.status(200).send({ success: false, message: "Email Id doest not exist", data: {} })

    if (await verifyPassword(pass, data.password)) return res.status(200).send({ success: true, message: "Login Successfull", data: (({ password, ...data }) => data)(data) })

    return res.status(200).send({ success: false, message: "Incorrect Password", data: {} })
  }
  catch (error) {
    console.error("Error login:", error);
    res.status(500).send({ message: error });
  }
})

server.listen(port, () => console.log(`Server running at port ${port}`))