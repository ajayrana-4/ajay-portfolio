import { Schema, model, models } from 'mongoose';

const AboutSchema = new Schema({
  heading: { type: String, default: 'About Me' },
  description: { type: String, default: '' },
  focusAreas: [{ type: String }],
}, { timestamps: true });

export const About = models.About || model('About', AboutSchema);
