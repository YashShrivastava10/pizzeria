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

export const cartDetails = async (req, res) => {
  try {
    const { email } = req.user

    // Connect to DB and fetch cart and pizza collection
    let data = await connectDB()
    const cart = data.collection("cart")
    const pizzaDetails = data.collection("pizza")

    // Get ids of items in user's cart
    // Use nullish coalescing operator to assign default value if value is not present
    const { details } = (await cart.findOne({ userId: email })) ?? {details: []}

    // Get details of item and add qty
    const promises = details.map(async item => {
      const pizzaDetail = await pizzaDetails.findOne({ id: item.id });
      return { ...pizzaDetail, qty: item.qty };
    });
    const results = await Promise.all(promises);

    res.send(results);
  } catch (error) {
    console.error("Error fetching cart data:", error);
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
    const { id, status } = req.query

    let data = await connectDB()
    const collection = data.collection("cart")

    const itemFilter = { userId: email, 'details.id': id }
    if (status !== "add") {
      const qty = status === "inc" ? 1 : -1
      let result = await collection.updateOne(itemFilter, { $inc: { 'details.$.qty': qty } })
      if (status === "dec") {
        const userCart = await collection.findOne({ userId: email })
        const updatedCart = userCart.details.filter(item => item.qty > 0);
        if (!updatedCart.length) {
          result = await collection.deleteOne({ userId: email })
        }
        else{
          result = await collection.updateOne({ userId: email }, { $set: { details: updatedCart } });
        }
      }
      return response(result, res)
    }
    else{
      const details = await collection.findOne({ userId: email })
      if (details) {
        const result = await collection.updateOne({ userId: email }, { $push: { details: { id, qty: 1 } } })
        return response(result, res)
      }
      else {
        const result = await collection.insertOne({ userId: email, details: [{ id, qty: 1 }] })
        return response(result, res)
      }
    }
  }
  catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).send("Internal Server Error");
  }
}


export const cartCount = async(req, res) => {
  try{
    const { email } = req.user

    let data = await connectDB()
    const collection = data.collection("cart")

    const details = await collection.findOne({ userId: email })
    const length = details ? details.details.reduce((acc, value) => acc + value.qty, 0) : 0
    return res.status(200).send({ success: true, count: length })
  }
  catch (error) {
    console.error("Error couting the item:", error);
    res.status(500).send("Internal Server Error");
  }
}