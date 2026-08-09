import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRouter from "./routes/product.route.js";
import dbConnection from "./config/dbConnection.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload", express.static(path.join(process.cwd(), "upload")));
app.use("/", productRouter);

app.get("/", (req, res) => {
  res.send("<h1>server running</h1>");
});

const PORT = process.env.PORT || 9000;
dbConnection()
  .then((reponse) => {
    console.log("db connected");

    app.listen(PORT, function () {
      console.log(`server runnimg on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
