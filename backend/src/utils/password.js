import bcrypt from "bcrypt"

const saltRounds = 10

export const encrypt = async(pass) => {
  try{
    const hash = await bcrypt.hash(pass, saltRounds)
    return hash
  }
  catch(error){
    console.log("Can't encrypt");
    throw error
  }
}

export const verifyPassword = async(typedPassword, userPassword) => {
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