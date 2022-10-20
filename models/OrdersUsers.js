import mongoose from "mongoose";

const OrdersUsersSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('OrdersUsers', OrdersUsersSchema)
