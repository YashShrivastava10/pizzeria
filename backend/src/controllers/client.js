import { collectionData } from "../utils/db";

export const getPizzaDetails = async(req, res) => {
  try {
    const data = await collectionData("pizza");
    res.send(data);
  } catch (error) {
    console.error("Error fetching pizza data:", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getIngredientDetails = async(req, res) => {
  try {
    const data = await collectionData("ingredients");
    res.send(data);
  } catch (error) {
    console.error("Error fetching ingredients data:", error);
    res.status(500).send("Internal Server Error");
  }
}