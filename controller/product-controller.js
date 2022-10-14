import mongoose from "mongoose";
import Product from "../model/productModel";

export const getProductById = async(req,res,next)=>{
  const id= req.params.id
  let product;

  try{
    product = await Product.findById(id)
  }
  catch(err){
    console.log(err)
  }
  if(!product){
    return res.status(404).json({ message: "No Product Find" });
  }
  return res.status(200).json({product: product})
}

export const getProduct = async (req, res, next) => {
  const id = req.params._id;
  const name = req.params.name;
  let productDetails;
  try {
    productDetails = await Product.findOne({ id: id, productName: name });
  } catch (err) {
    console.log(err);
  }
  if (!productDetails) {
    return res.status(404).json({ message: "No Product Find" });
  }
  return res.status(200).json({ product: productDetails });
};

export const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    return console.log(err);
  }
  if (!products) {
    return res.status(400).json({ message: "no product found" });
  }
  return res.status(200).json(products);
};

export const updateProduct = async (req, res, next) => {};

export const getAllProductsByGender = async (req, res, next) => {
  const bygender = req.params.gender;
  const type = req.query.type;
 
  let products;
  if (type) {
    console.log(type);
    try {
      products = await Product.find({ gender: bygender, type: type });
    } catch (err) {
      return console.log(err);
    }
  } else {
    try {
      products = await Product.find({ gender: bygender });
    } catch (err) {
      return console.log(err);
    }
  }

  if (!products) {
    return res.status(404).json({ message: " No Blog find" });
  }

  return res.status(200).json({ products: products });
};
