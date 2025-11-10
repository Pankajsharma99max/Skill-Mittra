import mongoose from 'mongoose'

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  contentHTML: { type: String },
  pdfURL: { type: String },
  videoURL: { type: String },
}, { timestamps: true })

export default mongoose.models.Resource || mongoose.model('Resource', ResourceSchema)
