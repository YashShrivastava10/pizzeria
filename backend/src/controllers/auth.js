import connectDB from "../utils/db.js"
import { encrypt, verifyPassword } from "../utils/password.js"
import jwt from "jsonwebtoken"

export const login = async(req, res) => {
  try {
    let data = await connectDB()
    const collection = data.collection("users")
    
    const { email, pass } = req.body

    data = await collection.findOne({ email: email })

    if (!data) return res.status(200).send({ success: false, message: "Email Id doest not exist", data: {} })

    if (await verifyPassword(pass, data.password)) {
      const token = jwt.sign({ userId: data._id, email: data.email }, process.env.JWT_SECRET_KEY, { expiresIn: '6h'})
      return res.status(200).send({ token, success: true, message: "Login Successfull", data: (({ password, ...data }) => data)(data) })
    }

    return res.status(200).send({ success: false, message: "Incorrect Password", data: {} })
  }
  catch (error) {
    console.error("Error login:", error);
    res.status(500).send({ message: error });
  }
}

export const signUp = async(req, res) => {
  try {
    let data = await connectDB()
    const collection = data.collection("users")

    const { name, email, pass } = req.body

    data = await collection.find({ email: email }).toArray()

    if (data.length === 0) {
      const hash = await encrypt(pass)
      const result = await collection.insertOne({ name, email, password: hash })

      if(result.acknowledged) {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, { expiresIn: '6h'})
        return res.status(200).send({ token, success: true, message: "Sign In Successfull" })
      }
      return res.status(200).send({ success: false, message: "Sign In Failed" })
    }
    return res.status(200).send({ success: false, message: "Email Id already Exist" })
  }
  catch(error){
    console.error("Error sigin:", error);
    res.status(500).send({ message: error });
  }
}
