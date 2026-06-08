import { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema({
  email: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  contactFormEnabled: { type: Boolean, default: true },
}, { timestamps: true });

export const Contact = models.Contact || model('Contact', ContactSchema);
