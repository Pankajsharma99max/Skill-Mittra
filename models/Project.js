import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner','Intermediate','Advanced'], required: true },
  steps: [{ type: String }],
  codeURL: { type: String },
  videoURL: { type: String },
  requiredComponents: [{ type: String }],
}, { timestamps: true })

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema)
