import express from "express";
import upload from "../middleware/multer.middleware.js";

import {
  createProduct,
  deleteProduct,
  readProduct,
  readSingleProduct,
  updateProduct,
} from "../controller/product.controller.js";

const productRouter = express.Router();

productRouter.post("/products", upload.single("image"), createProduct);
productRouter.get("/products", readProduct);
productRouter.get("/products/:id", readSingleProduct);
productRouter.put("/products/:id", updateProduct);
productRouter.delete("/products/:id", deleteProduct);

export default productRouter;
