const server = require("express")()
const port = 4000


server.get("/pizza", (req, res) => {
  res.send("Hello")
})

server.listen(port, () => console.log(`Server running at port ${port}`))