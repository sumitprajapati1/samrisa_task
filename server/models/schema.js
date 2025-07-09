import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const CheckoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  items: [ItemSchema],
  shipping: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Checkout = mongoose.model("Checkout", CheckoutSchema);
export default Checkout;
