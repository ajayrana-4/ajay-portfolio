import { Schema, model, models } from 'mongoose';

const SkillSchema = new Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['AI & GenAI', 'Backend', 'Databases', 'DevOps', 'Tools'],
    required: true,
  },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Skill = models.Skill || model('Skill', SkillSchema);
