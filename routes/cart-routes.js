import express from "express";
import { addCart, deleteCart, getCart } from "../controller/cart-controller.js";

const cartRouter = express.Router();

cartRouter.get("/cart/:id", getCart);
cartRouter.post("/cart/:id", addCart);
cartRouter.delete("/cart/:userId/:itemId", deleteCart);

export default cartRouter;
