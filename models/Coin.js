import mongoose from 'mongoose'

const CoinSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  user_id: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  action: {
    type: String,
    required: true
  }
})

export default mongoose.model('Coin', CoinSchema)