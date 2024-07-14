import express from "express";
import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import { prisma } from "./database/config/config.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(fileUpload());

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, prisma };
