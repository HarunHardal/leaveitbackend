import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  emailpermission: {
    type: String,
    required: false,
  },
  favorites: [{
    productId: { type: String } ,
    productName: {type: String},
    productImage: {type: String},
    productPrice: {type: String},
    required: false
  
  },
 ],
});

export default mongoose.model("User", userSchema);
