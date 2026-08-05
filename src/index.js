import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product.route.js";
import dbConnection from "./config/dbConnection.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload", express.static("upload"));
app.use("/", productRouter);

app.get("/", (req, res) => {
  res.send("<h1>server running</h1>");
});

dbConnection()
  .then((reponse) => {
    console.log("mongo db connected");

    const PORT = process.env.PORT || 9000;
    app.listen(PORT, function () {
      console.log(`server runnimg on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
