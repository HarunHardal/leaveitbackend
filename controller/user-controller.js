import User from "../model/userModel";
import bcrypt from "bcryptjs";

export const singup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const emailpermission = req.body.emailpermission;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already Exists! Login Intead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    gender,
    emailpermission,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ user });
};

export const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Couldnt Find User By This Email" });
  }
  const isPassword = bcrypt.compareSync(password, existingUser.password);
  if (!isPassword) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res
    .status(200)
    .json({ message: "Login Successfull", user: existingUser });
};

export const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "Couldnt Find User" });
  }
  return res.status(200).json({ user: user });
};

export const addFav = async (req, res, next) => {
  const userId = req.params.userId;

  const productId = req.body.productId;
  const productName = req.body.productName;
  const productImage = req.body.productImage;
  const productPrice = req.body.productPrice;

  let fav = await User.findById({ _id: userId });
  fav.favorites.push({
    productId: productId,
    productName: productName,
    productImage: productImage,
    productPrice: productPrice,
  });
  await fav.save();
};
