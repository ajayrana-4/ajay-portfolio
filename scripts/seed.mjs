/**
 * Seed script — populates MongoDB with default data for Ajay Rana's portfolio.
 * Run with: node scripts/seed.mjs
 * Make sure MONGODB_URI is set in .env.local
 */

import 'dotenv/config';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment');
  process.exit(1);
}

await mongoose.connect(MONGODB_URI);
console.log('✅ Connected to MongoDB');

// ── Schemas ────────────────────────────────────────────────────────────────
const Hero    = mongoose.model('Hero',    new mongoose.Schema({}, { strict: false }));
const About   = mongoose.model('About',   new mongoose.Schema({}, { strict: false }));
const Skill   = mongoose.model('Skill',   new mongoose.Schema({}, { strict: false }));
const Exp     = mongoose.model('Experience', new mongoose.Schema({}, { strict: false }));
const Project = mongoose.model('Project', new mongoose.Schema({}, { strict: false }));
const Contact = mongoose.model('Contact', new mongoose.Schema({}, { strict: false }));

// ── Seed Data ──────────────────────────────────────────────────────────────
await Hero.deleteMany({});
await Hero.create({
  name: 'Ajay Rana',
  title: 'AI Engineer',
  introduction: 'I build intelligent systems powered by LLMs, RAG pipelines, and GenAI — turning complex AI research into production-ready products.',
  profilePhoto: '',
  resumeUrl: '',
  githubUrl: 'https://github.com/ajayrana',
  linkedinUrl: 'https://linkedin.com/in/ajayrana',
  email: 'ajay@ajayrana.in',
});
console.log('✅ Hero seeded');

await About.deleteMany({});
await About.create({
  heading: 'About Me',
  description: `I'm an AI Engineer with deep expertise in building production-grade AI systems. My work spans from designing RAG pipelines and fine-tuning LLMs to deploying scalable AI APIs used by thousands of users.\n\nI'm passionate about the intersection of cutting-edge research and practical engineering — bridging the gap between what AI can do in a lab and what it can do in the real world.`,
  focusAreas: [
    'Retrieval-Augmented Generation (RAG)',
    'LLM Fine-tuning & Alignment',
    'Agentic AI Systems',
    'MLOps & AI Infrastructure',
    'Production AI API Design',
  ],
});
console.log('✅ About seeded');

await Skill.deleteMany({});
await Skill.insertMany([
  // AI & GenAI
  { name: 'LangChain', category: 'AI & GenAI', order: 1 },
  { name: 'LlamaIndex', category: 'AI & GenAI', order: 2 },
  { name: 'OpenAI API', category: 'AI & GenAI', order: 3 },
  { name: 'HuggingFace', category: 'AI & GenAI', order: 4 },
  { name: 'RAG Pipelines', category: 'AI & GenAI', order: 5 },
  { name: 'Fine-tuning', category: 'AI & GenAI', order: 6 },
  { name: 'Vector Search', category: 'AI & GenAI', order: 7 },
  // Backend
  { name: 'Python', category: 'Backend', order: 1 },
  { name: 'FastAPI', category: 'Backend', order: 2 },
  { name: 'Node.js', category: 'Backend', order: 3 },
  { name: 'Next.js', category: 'Backend', order: 4 },
  { name: 'TypeScript', category: 'Backend', order: 5 },
  // Databases
  { name: 'MongoDB', category: 'Databases', order: 1 },
  { name: 'PostgreSQL', category: 'Databases', order: 2 },
  { name: 'Redis', category: 'Databases', order: 3 },
  { name: 'Pinecone', category: 'Databases', order: 4 },
  { name: 'Weaviate', category: 'Databases', order: 5 },
  // DevOps
  { name: 'Docker', category: 'DevOps', order: 1 },
  { name: 'AWS', category: 'DevOps', order: 2 },
  { name: 'Vercel', category: 'DevOps', order: 3 },
  { name: 'GitHub Actions', category: 'DevOps', order: 4 },
  // Tools
  { name: 'Git', category: 'Tools', order: 1 },
  { name: 'VS Code', category: 'Tools', order: 2 },
  { name: 'Postman', category: 'Tools', order: 3 },
  { name: 'Jupyter', category: 'Tools', order: 4 },
]);
console.log('✅ Skills seeded');

await Exp.deleteMany({});
await Exp.insertMany([
  {
    company: 'AI-First Startup',
    role: 'Senior AI Engineer',
    duration: 'Jan 2024 – Present',
    description: 'Lead the design and deployment of RAG-based knowledge management systems using LangChain and Pinecone. Fine-tuned open-source LLMs (Llama 3, Mistral) achieving 40% reduction in hallucination rates. Built and shipped AI APIs serving 10k+ requests/day.',
    order: 1,
  },
  {
    company: 'Tech Consulting Firm',
    role: 'Machine Learning Engineer',
    duration: 'Jun 2022 – Dec 2023',
    description: 'Built end-to-end ML pipelines for NLP tasks including text classification, named entity recognition, and semantic search. Deployed models using FastAPI and Docker on AWS ECS. Improved model inference latency by 60% through quantization and batching.',
    order: 2,
  },
  {
    company: 'SaaS Product Company',
    role: 'Backend Engineer (AI Features)',
    duration: 'Aug 2021 – May 2022',
    description: 'Integrated AI-powered features into a B2B SaaS product — including smart document parsing, automated tagging, and conversational search. Collaborated with product teams to translate AI capabilities into user-facing features.',
    order: 3,
  },
]);
console.log('✅ Experience seeded');

await Project.deleteMany({});
await Project.insertMany([
  {
    title: 'DocuMind — Intelligent Document Q&A',
    description: 'A RAG-powered system that lets users upload PDFs and ask natural language questions. Built with LangChain, Pinecone, and GPT-4 with streaming responses.',
    techStack: ['Python', 'LangChain', 'Pinecone', 'FastAPI', 'Next.js'],
    githubUrl: 'https://github.com/ajayrana/documind',
    demoUrl: '',
    image: '',
    order: 1,
  },
  {
    title: 'AgentFlow — AI Workflow Builder',
    description: 'A visual drag-and-drop tool for building multi-agent AI workflows. Supports tool use, memory, and human-in-the-loop with LangGraph under the hood.',
    techStack: ['TypeScript', 'LangGraph', 'React', 'Node.js', 'Redis'],
    githubUrl: 'https://github.com/ajayrana/agentflow',
    demoUrl: '',
    image: '',
    order: 2,
  },
  {
    title: 'SemanticSearch — Open Source Toolkit',
    description: 'Production-ready semantic search library supporting multiple vector databases. 500+ GitHub stars. Includes hybrid search, re-ranking, and multi-modal embeddings.',
    techStack: ['Python', 'Weaviate', 'HuggingFace', 'FastAPI'],
    githubUrl: 'https://github.com/ajayrana/semantic-search',
    demoUrl: '',
    image: '',
    order: 3,
  },
]);
console.log('✅ Projects seeded');

await Contact.deleteMany({});
await Contact.create({
  email: 'ajay@ajayrana.in',
  linkedinUrl: 'https://linkedin.com/in/ajayrana',
  githubUrl: 'https://github.com/ajayrana',
  contactFormEnabled: true,
});
console.log('✅ Contact seeded');

await mongoose.disconnect();
console.log('\n🎉 Database seeded successfully!');
