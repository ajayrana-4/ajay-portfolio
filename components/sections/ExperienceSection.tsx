import { MapPin, Calendar } from 'lucide-react';

interface ExperienceData {
  _id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export default function ExperienceSection({ data }: { data: ExperienceData[] }) {
  return (
    <section id="experience" className="section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-indigo-400 font-semibold text-sm tracking-widest uppercase mb-3">Career Path</p>
          <h2 className="section-heading">Experience<span className="accent-dot">.</span></h2>
          <p className="section-subheading">Where I've worked and what I've built</p>
        </div>

        {data.length === 0 ? (
          <p className="text-gray-500">No experience added yet.</p>
        ) : (
          <div className="relative max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/20 to-transparent ml-3" />

            {data.map((exp, i) => (
              <div key={exp._id} className="timeline-item ml-8">
                <div className="timeline-dot" />
                <div className="glass-card p-6 hover:shadow-xl transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-white text-lg">{exp.role}</h3>
                      <p className="text-indigo-400 font-medium text-sm">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs whitespace-nowrap">
                      <Calendar size={13} />
                      {exp.duration}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
