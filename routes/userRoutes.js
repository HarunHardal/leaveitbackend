import express from "express";
import mongoose from "mongoose";
import {singup, login, getUserById, addFav} from "../controller/user-controller.js";



const userRoutes = express.Router();

userRoutes.post("/singup", singup);
userRoutes.post("/login", login)
userRoutes.get("/getuserbyid/:id", getUserById)
userRoutes.put("/add-fovorites/:userId/", addFav)

export default userRoutes;
