import Link from 'next/link';
import { User, Bot, Zap, Briefcase, FolderKanban, Phone, ArrowRight } from 'lucide-react';

const sections = [
  { href: '/admin/hero', label: 'Hero', icon: User, desc: 'Name, photo, title, intro & social links' },
  { href: '/admin/about', label: 'About', icon: Bot, desc: 'About description & focus areas' },
  { href: '/admin/skills', label: 'Skills', icon: Zap, desc: 'Add, edit, and remove skills by category' },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase, desc: 'Work history and job descriptions' },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban, desc: 'Portfolio projects with links & images' },
  { href: '/admin/contact', label: 'Contact', icon: Phone, desc: 'Contact info & form submissions' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm">Manage every section of your portfolio</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(({ href, label, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="glass-card p-6 group flex flex-col gap-4 no-underline"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Icon size={18} className="text-indigo-400" />
              </div>
              <ArrowRight
                size={16}
                className="text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all"
              />
            </div>
            <div>
              <h2 className="font-semibold text-white text-sm mb-1">{label}</h2>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 glass-card p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white text-sm mb-1">View Live Portfolio</h3>
          <p className="text-gray-500 text-xs">See how your portfolio looks to visitors</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
          Open Site
        </a>
      </div>
    </div>
  );
}
