import connectDB, { collectionData } from "../utils/db.js";

export const getPizzaDetails = async (req, res) => {
  try {
    const data = await collectionData("pizza");
    res.send(data);
  } catch (error) {
    console.error("Error fetching pizza data:", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getIngredientDetails = async (req, res) => {
  try {
    const data = await collectionData("ingredients");
    res.send(data);
  } catch (error) {
    console.error("Error fetching ingredients data:", error);
    res.status(500).send("Internal Server Error");
  }
}

const response = (result, res) => {
  if (result.acknowledged) return res.status(200).send({ success: true })
  return res.status(400).send({ success: false })
}

export const addToCart = async (req, res) => {
  try {
    const { email } = req.user
    const { id } = req.query

    let data = await connectDB()
    const collection = data.collection("cart")

    // Check if user has cart or not
    const details = await collection.findOne({ userId: email })
    // If user has cart
    if (details) {
      // Check if item is new or existing
      const itemFilter = { userId: email, 'details.id': id }
      const find = await collection.findOne(itemFilter)
      // If item exists
      if (find) {
        const result = await collection.updateOne(itemFilter, { $inc: { 'details.$.qty': 1 } })
        return response(result, res)
      }
      // If item is new
      else {
        const result = await collection.updateOne({ userId: email }, { $push: { details: { id, qty: 1 } } })
        return response(result, res)
      }
    }
    // If user don't have cart
    else {
      const result = await collection.insertOne({ userId: email, details: [{ id, qty: 1 }] })
      return response(result, res)
    }
  }
  catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).send("Internal Server Error");
  }
}