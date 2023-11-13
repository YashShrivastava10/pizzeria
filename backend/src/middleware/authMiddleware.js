import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization
  if(!token) return res.status(401).send({message: "No Token"})
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()
  }
  catch(e){
    return res.status(401).send({message: "Invalid Token"})
  }
}