import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Kits','Components','Add-On Modules'], required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [{ type: String }],
  description: { type: String },
  contents: [{ type: String }],
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
