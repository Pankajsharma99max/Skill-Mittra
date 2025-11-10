import mongoose from 'mongoose'

const WorkshopRequestSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  contactName: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  status: { type: String, enum: ['Pending','Approved','Scheduled','Rejected'], default: 'Pending' },
}, { timestamps: true })

export default mongoose.models.WorkshopRequest || mongoose.model('WorkshopRequest', WorkshopRequestSchema)
