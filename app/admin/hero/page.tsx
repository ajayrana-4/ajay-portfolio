'use client';
import { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';

export default function AdminHeroPage() {
  const [form, setForm] = useState({
    name: '', title: '', introduction: '', profilePhoto: '',
    resumeUrl: '', githubUrl: '', linkedinUrl: '', email: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/hero').then(r => r.json()).then(data => {
      setForm({
        name: data.name || '',
        title: data.title || '',
        introduction: data.introduction || '',
        profilePhoto: data.profilePhoto || '',
        resumeUrl: data.resumeUrl || '',
        githubUrl: data.githubUrl || '',
        linkedinUrl: data.linkedinUrl || '',
        email: data.email || '',
      });
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="text-gray-500 text-sm">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Hero Section</h1>
          <p className="text-gray-500 text-sm">Your first impression on visitors</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saved ? <><CheckCircle size={16} /> Saved!</> : saving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      <div className="glass-card p-6 flex flex-col gap-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ajay Rana" />
          </div>
          <div>
            <label className="form-label">Title / Role</label>
            <input className="form-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="AI Engineer" />
          </div>
        </div>

        <div>
          <label className="form-label">Short Introduction</label>
          <textarea className="form-input" rows={4} value={form.introduction} onChange={e => setForm({...form, introduction: e.target.value})} placeholder="Tell visitors who you are and what you do..." />
        </div>

        <div>
          <label className="form-label">Profile Photo URL</label>
          <input className="form-input" value={form.profilePhoto} onChange={e => setForm({...form, profilePhoto: e.target.value})} placeholder="https://..." />
          <p className="text-xs text-gray-600 mt-1">Upload your photo to Cloudinary and paste the URL here</p>
        </div>

        <div>
          <label className="form-label">Resume URL</label>
          <input className="form-input" value={form.resumeUrl} onChange={e => setForm({...form, resumeUrl: e.target.value})} placeholder="https://drive.google.com/..." />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="form-label">GitHub URL</label>
            <input className="form-input" value={form.githubUrl} onChange={e => setForm({...form, githubUrl: e.target.value})} placeholder="https://github.com/..." />
          </div>
          <div>
            <label className="form-label">LinkedIn URL</label>
            <input className="form-input" value={form.linkedinUrl} onChange={e => setForm({...form, linkedinUrl: e.target.value})} placeholder="https://linkedin.com/in/..." />
          </div>
        </div>

        <div>
          <label className="form-label">Email</label>
          <input type="email" className="form-input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="ajay@ajayrana.in" />
        </div>
      </div>
    </div>
  );
}
