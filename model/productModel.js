import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: ["Men", "Women","Boy", "Girl"],
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },

  items: [
    {
      color: {
        type: String,
        required: true,
      },
      productImage: {
        type: String,
      },
    },
  ],
  sizes: [
    {
      size:{
        type: String,
        required: true
      },
      stock: {
        type: Boolean
      }
    }
  ]
});

export default mongoose.model("Product", productSchema);
