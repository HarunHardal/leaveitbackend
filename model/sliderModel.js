import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sliderSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
export default mongoose.model("slider", sliderSchema);
