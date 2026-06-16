'use client';
import Image from 'next/image';
import { Mail, Download, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

interface HeroData {
  name: string;
  title: string;
  introduction: string;
  profilePhoto: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
}

export default function HeroSection({ data }: { data: HeroData }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background orbs */}
      <div className="gradient-orb w-[600px] h-[600px] bg-indigo-600/10 -top-32 -left-32 absolute" />
      <div className="gradient-orb w-[400px] h-[400px] bg-purple-600/8 bottom-0 right-0 absolute" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 flex flex-col md:flex-row items-center gap-16">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <div className="badge mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-1" />
            Available for opportunities
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 animate-fade-in-up">
            {data.name || 'Ajay Rana'}
          </h1>

          <p className="text-xl md:text-2xl gradient-text font-semibold mb-6 animate-fade-in-up delay-100">
            {data.title || 'AI Engineer'}
          </p>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10 animate-fade-in-up delay-200">
            {data.introduction || 'Building intelligent systems with cutting-edge AI & GenAI technologies.'}
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in-up delay-300">
            {data.resumeUrl && (
              <a href={data.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Download size={16} />
                Download Resume
              </a>
            )}
            <a href="#projects" className="btn-secondary">
              View Projects <ArrowRight size={16} />
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-10 justify-center md:justify-start animate-fade-in-up delay-400">
            {data.githubUrl && (
              <a
                href={data.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500 transition-all duration-200 hover:-translate-y-0.5"
              >
                <GithubIcon size={18} />
              </a>
            )}
            {data.linkedinUrl && (
              <a
                href={data.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500 transition-all duration-200 hover:-translate-y-0.5"
              >
                <LinkedinIcon size={18} />
              </a>
            )}
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Mail size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Profile Photo */}
        <div className="animate-float relative">
          <div className="relative w-64 h-60 md:w-80 md:h-90">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-600/30 blur-2xl" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {data.profilePhoto ? (
                <Image
                  src={data.profilePhoto}
                  alt={data.name || 'Ajay Rana'}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center">
                  <span className="text-6xl font-bold gradient-text">
                    {(data.name || 'AR').split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  );
}
