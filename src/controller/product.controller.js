import mongoose from "mongoose";
import ProductModel from "../model/product.model.js";

const createProduct = async (req, res) => {
  try {
    const { title, price, description, category } = req.body;
    const image = req.file ? req.file.filename : "";

    const rating = {
      rate: Number(req.body["rating.rate"]),
      count: Number(req.body["rating.count"]),
    };
    const productPrice = Number(price);

    if (
      !title ||
      price === undefined ||
      !description ||
      !category ||
      !image ||
      title.trim().length <= 0 ||
      description.trim().length <= 0 ||
      category.trim().length <= 0 ||
      Number.isNaN(rating.rate) ||
      Number.isNaN(rating.count) ||
      Number.isNaN(productPrice)
    ) {
      return res
        .status(400)
        .json({ status: false, message: "all field are require" });
    }

    const existingProduct = await ProductModel.findOne({
      title: title.trim(),
    });

    if (existingProduct) {
      return res.status(409).json({
        status: false,
        message: "Product already exists",
      });
    }

    const newProduct = await ProductModel.create({
      title,
      price: productPrice,
      description,
      category,
      image,
      rating,
    });

    res.status(201).json({
      status: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const readProduct = async (req, res) => {
  try {
    const products = await ProductModel.find();

    const updatedProducts = products.map((product) => ({
      ...product.toObject(),
      image: `http://localhost:9000/upload/${product.image}`,
    }));

    return res.status(200).json({
      status: true,
      message: "Products fetched successfully",
      data: updatedProducts,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const readSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Product ID",
      });
    }

    const product = await ProductModel.findById(productId);

    return res
      .status(200)
      .json({ status: true, message: "get single product", data: product });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
const updateProduct = async function (req, res) {
  try {
    const productId = req.params.id;
    const { title, price, description, category, image, rating } = req.body;

    if (
      !title ||
      price === undefined ||
      !description ||
      !category ||
      !image ||
      !rating ||
      title.trim().length <= 0 ||
      description.trim().length <= 0 ||
      category.trim().length <= 0 ||
      rating.rate === undefined ||
      rating.count === undefined ||
      image.trim().length <= 0
    ) {
      return res
        .status(400)
        .json({ status: false, message: "all field are require" });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Product ID",
      });
    }

    const product = await ProductModel.findByIdAndUpdate(
      productId,
      {
        title,
        price,
        description,
        category,
        rating,
        image,
      },
      { new: true },
    );

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "product not found" });
    }

    return res.status(200).json({
      status: true,
      message: "product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteProduct = async function (req, res) {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Product ID",
      });
    }

    const product = await ProductModel.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }
    return res
      .status(200)
      .json({ status: true, message: "product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
export {
  createProduct,
  readProduct,
  readSingleProduct,
  updateProduct,
  deleteProduct,
};
