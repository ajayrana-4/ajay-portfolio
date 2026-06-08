import { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  techStack: [{ type: String }],
  githubUrl: { type: String, default: '' },
  demoUrl: { type: String, default: '' },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Project = models.Project || model('Project', ProjectSchema);
