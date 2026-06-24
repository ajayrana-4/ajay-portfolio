import { Schema, model, models } from 'mongoose';

const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  industry: { type: String, default: '' },
  role: { type: String, required: true },
  location: { type: String, default: '' },
  duration: { type: String, required: true },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Experience = models.Experience || model('Experience', ExperienceSchema);
