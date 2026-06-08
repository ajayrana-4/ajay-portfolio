import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

interface ProjectData {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  image: string;
}

export default function ProjectsSection({ data }: { data: ProjectData[] }) {
  return (
    <section id="projects" className="section" style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary), var(--bg-primary))' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-indigo-400 font-semibold text-sm tracking-widest uppercase mb-3">My Work</p>
          <h2 className="section-heading">Featured Projects<span className="accent-dot">.</span></h2>
          <p className="section-subheading">Things I've built and shipped</p>
        </div>

        {data.length === 0 ? (
          <p className="text-center text-gray-500">No projects added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((project) => (
              <article key={project._id} className="glass-card overflow-hidden group flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-600/10 to-purple-600/10 flex-shrink-0">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl font-bold gradient-text opacity-40">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-white text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="badge text-xs">{tech}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs font-medium transition-colors"
                      >
                        <GithubIcon size={14} /> Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs font-medium transition-colors"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
