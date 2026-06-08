'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard, User, Zap, Briefcase, FolderKanban,
  Phone, LogOut, Bot, ExternalLink,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/hero', label: 'Hero', icon: User },
  { href: '/admin/about', label: 'About', icon: Bot },
  { href: '/admin/skills', label: 'Skills', icon: Zap },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/contact', label: 'Contact', icon: Phone },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="mb-8 px-2">
        <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-1">Portfolio CMS</p>
        <p className="text-white font-bold text-sm">Ajay Rana</p>
      </div>

      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={`admin-nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-2">
        <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-link text-xs">
          <ExternalLink size={14} />
          View Portfolio
        </a>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="admin-nav-link text-red-400/80 hover:text-red-400 hover:bg-red-500/10 w-full text-left"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
