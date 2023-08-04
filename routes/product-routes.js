import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import Product from "../model/productModel.js";
import {
  getProduct,
  updateProduct,
  getAllProducts,
  getAllProductsByGender,
  getProductById,
} from "../controller/product-controller.js";

const productRoutes = express.Router();

/* */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });
/* */

productRoutes
  .route("/add")
  .post(upload.single("productImage"), async (req, res, next) => {
    console.log(req.body);

    const productName = req.body.productName;
    const type = req.body.type;
    const gender = req.body.gender;
    const description = req.body.description;
    const price = req.body.price;
    const color = req.body.color;
    const sizes = req.body.sizes;
    const productImage = req.file.filename;

    const items = {
      color,
      productImage,
    };
    const newProductData = {
      productName,
      type,
      gender,
      description,
      price,
      items,
      sizes,
    };

    const newProduct = new Product(newProductData);

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await newProduct.save(session);
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  });

productRoutes
  .route("/update/:id")
  .put(upload.single("productImage"), async (req, res, next) => {
    const color = req.body.color;
    const productImage = req.file.filename;
    const id = req.params.id;
    let product = await Product.findOne({_id: id})
    product.items.push({color,productImage})
    await product.save()
  });

  productRoutes
  .route("/update/sizes/:id")
  .put(upload.single("productImage"), async (req, res, next) => {
    const size = req.body.size;
    const stock = req.body.stock;
    const id = req.params.id;

    let sizes  = await Product.findOne({_id: id})
    sizes.sizes.push({size,stock})
    await sizes.save()
  
   
  });


productRoutes.get("/getProduct/:id", getProductById)
productRoutes.get("/:id/:name", getProduct);
productRoutes.get("/allproducts", getAllProducts);
productRoutes.put("/allproducts/update", updateProduct);
productRoutes.get("/allproducts/products/:gender", getAllProductsByGender);

export default productRoutes;
