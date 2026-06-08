import mongoose, { Schema, model, models } from 'mongoose';

const HeroSchema = new Schema({
  name: { type: String, default: 'Ajay Rana' },
  title: { type: String, default: 'AI Engineer' },
  introduction: { type: String, default: '' },
  profilePhoto: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  email: { type: String, default: '' },
}, { timestamps: true });

export const Hero = models.Hero || model('Hero', HeroSchema);
