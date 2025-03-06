import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import clientRoutes from "./routes/client.js";

const server = express();
server.use(
  cors({
    credentials: true,
    origin: true,
  })
);
server.use(express.json());
const port = 4000;

server.use("/api/auth", authRoutes);
server.use("/api/pizza", clientRoutes);

server.listen(port, () => console.log(`Server running at port ${port}`));
