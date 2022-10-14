import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: String,
  },
  items: [
    {
      productId: {
        type: String,
      },
      productName: String,
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
        default: 1,
      },
      price: String,
    },
  ],
  bill: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("Cart", cartSchema);
