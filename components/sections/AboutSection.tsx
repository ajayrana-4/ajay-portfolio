'use client';
import { useState } from 'react';
import { Target, ChevronDown } from 'lucide-react';

interface AboutData {
  heading: string;
  description: string;
  focusAreas: string[];
}

const FOCUS_LIMIT = 5;

export default function AboutSection({ data }: { data: AboutData }) {
  const [showAllFocus, setShowAllFocus] = useState(false);

  const focusAreas = data.focusAreas || [];
  const visibleFocus = showAllFocus ? focusAreas : focusAreas.slice(0, FOCUS_LIMIT);
  const hasMoreFocus = focusAreas.length > FOCUS_LIMIT;

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
              {visibleFocus.map((area, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-colors"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{area}</span>
                </div>
              ))}
              {focusAreas.length === 0 && (
                <p className="text-gray-500 text-sm">No focus areas added yet.</p>
              )}
            </div>

            {hasMoreFocus && (
              <button
                type="button"
                onClick={() => setShowAllFocus((prev) => !prev)}
                className="mt-5 flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {showAllFocus ? 'Show less' : `Show ${focusAreas.length - FOCUS_LIMIT} more`}
                <ChevronDown
                  size={15}
                  className={`transition-transform ${showAllFocus ? 'rotate-180' : ''}`}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
