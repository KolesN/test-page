import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    unique: true,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', UserSchema)