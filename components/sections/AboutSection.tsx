import { Target } from 'lucide-react';

interface AboutData {
  heading: string;
  description: string;
  focusAreas: string[];
}

export default function AboutSection({ data }: { data: AboutData }) {
  return (
    <section id="about" className="section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-indigo-400 font-semibold text-sm tracking-widest uppercase mb-3">Who I Am</p>
            <h2 className="section-heading mb-6">
              {data.heading || 'About Me'}<span className="accent-dot">.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed text-base whitespace-pre-wrap">
              {data.description || 'Passionate AI Engineer building intelligent systems.'}
            </p>
          </div>

          {/* Right: Focus Areas */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Target size={16} className="text-indigo-400" />
              </div>
              <h3 className="font-semibold text-white">Current Focus</h3>
            </div>
            <div className="flex flex-col gap-3">
              {(data.focusAreas || []).map((area, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-colors"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{area}</span>
                </div>
              ))}
              {(!data.focusAreas || data.focusAreas.length === 0) && (
                <p className="text-gray-500 text-sm">No focus areas added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
