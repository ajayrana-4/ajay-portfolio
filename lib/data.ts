import connectDB from '@/lib/mongodb';
import { Hero } from '@/lib/models/Hero';
import { About } from '@/lib/models/About';
import { Skill } from '@/lib/models/Skill';
import { Experience } from '@/lib/models/Experience';
import { Project } from '@/lib/models/Project';
import { Contact } from '@/lib/models/Contact';

export async function getPortfolioData() {
  try {
    await connectDB();

    const [hero, about, skills, experience, projects, contact] = await Promise.all([
      Hero.findOne().lean().catch(() => ({})),
      About.findOne().lean().catch(() => ({})),
      Skill.find().sort({ category: 1, order: 1 }).lean().catch(() => []),
      Experience.find().sort({ order: 1 }).lean().catch(() => []),
      Project.find().sort({ order: 1 }).lean().catch(() => []),
      Contact.findOne().lean().catch(() => ({})),
    ]);

    return {
      hero: hero ?? {},
      about: about ?? {},
      skills: skills ?? [],
      experience: experience ?? [],
      projects: projects ?? [],
      contact: contact ?? {},
    };
  } catch {
    return { hero: {}, about: {}, skills: [], experience: [], projects: [], contact: {} };
  }
}
