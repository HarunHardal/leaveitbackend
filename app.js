import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/product-routes.js"
import userRoutes from "./routes/userRoutes.js";
import cartRouter from "./routes/cart-routes.js";
import * as dotenv from 'dotenv' 
dotenv.config()
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/product",productRoutes)
app.use("/user",userRoutes)
app.use("/cartDetail", cartRouter)

mongoose.connect(
  process.env.SECRET_DB
).then(()=>{
    app.listen(process.env.PORT||PORT)
}).then(()=>{
    console.log("app work")
}).catch((err)=>{console.log(err)});
