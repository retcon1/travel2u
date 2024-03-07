import { config } from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";

config();

// Original method of displaying connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("Connected to MongoDB!");
//   })
//   .catch((err) => {
//     console.error(`Connection error`, err);
//     process.exit();
//   });

// This method utilises mongoose functionality
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;
