'use client';
import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

interface ContactData {
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  contactFormEnabled: boolean;
}

export default function ContactSection({ data }: { data: ContactData }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  const socialLinks = [
    { icon: <Mail size={20} />, label: data.email, href: `mailto:${data.email}`, show: !!data.email },
    { icon: <LinkedinIcon size={20} />, label: 'LinkedIn', href: data.linkedinUrl, show: !!data.linkedinUrl },
    { icon: <GithubIcon size={20} />, label: 'GitHub', href: data.githubUrl, show: !!data.githubUrl },
  ].filter((l) => l.show);

  return (
    <section id="contact" className="section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-indigo-400 font-semibold text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="section-heading">Let's Work Together<span className="accent-dot">.</span></h2>
          <p className="section-subheading">Have a project in mind? I'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Left: Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Let's connect</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Whether you have a project idea, want to collaborate, or just want to say hi — my inbox is always open.
            </p>
            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg border border-white/10 group-hover:border-indigo-500/50 flex items-center justify-center transition-colors">
                    {link.icon}
                  </div>
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          {data.contactFormEnabled && (
            <div className="glass-card p-6">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full py-10 gap-4 text-center">
                  <CheckCircle size={48} className="text-green-400" />
                  <h4 className="text-lg font-semibold text-white">Message Sent!</h4>
                  <p className="text-gray-400 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                  <button onClick={() => setStatus('idle')} className="btn-secondary text-sm mt-2">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-input"
                      placeholder="Your message..."
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary justify-center"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
