import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

interface FooterProps {
  name: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

export default function Footer({ name, githubUrl, linkedinUrl, email }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm flex items-center gap-1.5">
          © {year} {name || 'Ajay Rana'}. Built with{' '}
          <Heart size={12} className="text-red-400 fill-red-400" /> and Next.js
        </p>
        <div className="flex items-center gap-4">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <GithubIcon size={16} />
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <LinkedinIcon size={16} />
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="text-gray-500 hover:text-white transition-colors">
              <Mail size={16} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
