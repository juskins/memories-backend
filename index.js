import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import { configDotenv } from "dotenv";

const app = express();
configDotenv()
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);

// Connecting our mongodB
const CONNECTION_URL = process.env.CONNECTION_URL
mongoose
   .connect(CONNECTION_URL)
   .then(() =>
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
   )
   .catch(err => console.log(err.message));

