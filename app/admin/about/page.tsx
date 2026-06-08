'use client';
import { useState, useEffect } from 'react';
import { Save, CheckCircle, Plus, X } from 'lucide-react';

export default function AdminAboutPage() {
  const [form, setForm] = useState({ heading: '', description: '', focusAreas: [] as string[] });
  const [newFocus, setNewFocus] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/about').then(r => r.json()).then(data => {
      setForm({
        heading: data.heading || '',
        description: data.description || '',
        focusAreas: data.focusAreas || [],
      });
      setLoading(false);
    });
  }, []);

  const addFocus = () => {
    if (!newFocus.trim()) return;
    setForm({ ...form, focusAreas: [...form.focusAreas, newFocus.trim()] });
    setNewFocus('');
  };

  const removeFocus = (i: number) => {
    setForm({ ...form, focusAreas: form.focusAreas.filter((_, idx) => idx !== i) });
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/about', {
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
          <h1 className="text-2xl font-bold text-white mb-1">About Section</h1>
          <p className="text-gray-500 text-sm">Tell visitors more about yourself</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saved ? <><CheckCircle size={16} /> Saved!</> : saving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      <div className="glass-card p-6 flex flex-col gap-5">
        <div>
          <label className="form-label">Section Heading</label>
          <input className="form-input" value={form.heading} onChange={e => setForm({...form, heading: e.target.value})} placeholder="About Me" />
        </div>

        <div>
          <label className="form-label">About Description</label>
          <textarea className="form-input" rows={7} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Write a few paragraphs about yourself, your background, and your passion..." />
        </div>

        <div>
          <label className="form-label">Current Focus Areas</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {form.focusAreas.map((area, i) => (
              <span key={i} className="badge flex items-center gap-1.5">
                {area}
                <button onClick={() => removeFocus(i)} className="hover:text-red-400 transition-colors ml-1">
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="form-input flex-1"
              value={newFocus}
              onChange={e => setNewFocus(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addFocus()}
              placeholder="e.g. Large Language Models"
            />
            <button onClick={addFocus} className="btn-secondary px-3">
              <Plus size={16} />
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-1">Press Enter or click + to add</p>
        </div>
      </div>
    </div>
  );
}
