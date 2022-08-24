import express, { Request, Response } from "express";
import routes from "./routes";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import cors from "cors";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}/?retryWrites=true&w=majority`
  )

  .then((data) => {
    console.log("MongoDB Connection Succeeded", data.version);
  })

  .catch((err) => {
    console.log("Error in DB connection:", err.message);
  });

app.listen(process.env.PORT, () =>
  console.log(`Server running on port http://localhost:${process.env.PORT}`)
);

app.get("/", (req: Request, res: Response) => {
  return res.send("Test completed!!");
});
