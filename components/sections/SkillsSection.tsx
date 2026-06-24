'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Skill {
  _id: string;
  name: string;
  category: string;
}

const CATEGORIES = ['AI & GenAI', 'Backend', 'Databases', 'DevOps', 'Tools'];

const CATEGORY_COLORS: Record<string, string> = {
  'AI & GenAI': 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-300',
  'Backend': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300',
  'Databases': 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300',
  'DevOps': 'from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-300',
  'Tools': 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300',
};

const SKILL_LIMIT = 6;

function SkillCard({ category, skills }: { category: string; skills: Skill[] }) {
  const [expanded, setExpanded] = useState(false);
  const colorClass = CATEGORY_COLORS[category];

  const hasMore = skills.length > SKILL_LIMIT;
  const visibleSkills = expanded ? skills : skills.slice(0, SKILL_LIMIT);

  return (
    <div className="glass-card p-6 flex flex-col min-h-[230px]">
      <div className={`inline-flex self-start items-center px-3 py-1.5 rounded-lg bg-gradient-to-r ${colorClass} border text-xs font-semibold mb-5`}>
        {category}
      </div>
      <div className="flex flex-wrap gap-2">
        {visibleSkills.map((skill) => (
          <span key={skill._id} className="skill-pill">
            {skill.name}
          </span>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors self-start"
        >
          {expanded ? 'Show less' : `+${skills.length - SKILL_LIMIT} more`}
          <ChevronDown
            size={15}
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
}

export default function SkillsSection({ data }: { data: Skill[] }) {
  const grouped: Record<string, Skill[]> = {};
  CATEGORIES.forEach((cat) => {
    grouped[cat] = data.filter((s) => s.category === cat);
  });

  return (
    <section id="skills" className="section skills-section-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-indigo-400 font-semibold text-sm tracking-widest uppercase mb-3">Technical Arsenal</p>
          <h2 className="section-heading">Skills & Technologies<span className="accent-dot">.</span></h2>
          <p className="section-subheading">Tools and technologies I work with regularly</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {CATEGORIES.map((cat) => {
            if (grouped[cat].length === 0) return null;
            return <SkillCard key={cat} category={cat} skills={grouped[cat]} />;
          })}
        </div>
      </div>
    </section>
  );
}
