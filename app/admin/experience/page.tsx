'use client';
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Experience { _id: string; company: string; industry: string; role: string; location: string; duration: string; description: string; }
type FormState = Omit<Experience, '_id'>;

const empty: FormState = { company: '', industry: '', role: '', location: '', duration: '', description: '' };

export default function AdminExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchData = () =>
    fetch('/api/experience').then(r => r.json()).then(d => { setItems(d); setLoading(false); });

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    if (!form.company || !form.role) return;
    if (editId) {
      await fetch(`/api/experience/${editId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/experience', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
    }
    setForm(empty); setShowForm(false); setEditId(null); fetchData();
  };

  const startEdit = (item: Experience) => {
    setForm({ company: item.company, industry: item.industry, role: item.role, location: item.location, duration: item.duration, description: item.description });
    setEditId(item._id); setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    await fetch(`/api/experience/${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (loading) return <div className="text-gray-500 text-sm">Loading...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Experience</h1>
          <p className="text-gray-500 text-sm">Your work history and roles</p>
        </div>
        <button onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }} className="btn-primary">
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-6 flex flex-col gap-4">
          <h3 className="font-semibold text-white text-sm">{editId ? 'Edit' : 'Add'} Experience</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Company</label>
              <input className="form-input" value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Company Name" />
            </div>
            <div>
              <label className="form-label">Industry</label>
              <input className="form-input" value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} placeholder="Ad Tech / Fintech" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Role</label>
              <input className="form-input" value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="Senior AI Engineer" />
            </div>
            <div>
              <label className="form-label">Location</label>
              <input className="form-input" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Bengaluru, India / Remote" />
            </div>
          </div>
          <div>
            <label className="form-label">Duration</label>
            <input className="form-input" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="Jan 2023 – Present" />
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea className="form-input" rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe your responsibilities and achievements..." />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSubmit} className="btn-primary"><Check size={16} /> {editId ? 'Update' : 'Add'}</button>
            <button onClick={() => { setShowForm(false); setEditId(null); setForm(empty); }} className="btn-secondary"><X size={16} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {items.length === 0 ? (
          <div className="glass-card p-10 text-center text-gray-500 text-sm">No experience added yet.</div>
        ) : items.map(item => (
          <div key={item._id} className="glass-card overflow-hidden">
            <div
              className="flex items-center justify-between p-5 cursor-pointer"
              onClick={() => setExpanded(expanded === item._id ? null : item._id)}
            >
              <div>
                <p className="font-semibold text-white text-sm">{item.role}</p>
                <p className="text-indigo-400 text-xs mt-0.5">{item.company}{item.industry ? ` – ${item.industry}` : ''}{item.location ? ` · ${item.location}` : ''} · {item.duration}</p>
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="Edit experience" title="Edit" onClick={e => { e.stopPropagation(); startEdit(item); }} className="p-1.5 rounded text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"><Pencil size={13} /></button>
                <button aria-label="Delete experience" title="Delete" onClick={e => { e.stopPropagation(); handleDelete(item._id); }} className="p-1.5 rounded text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={13} /></button>
                {expanded === item._id ? <ChevronUp size={15} className="text-gray-500" /> : <ChevronDown size={15} className="text-gray-500" />}
              </div>
            </div>
            {expanded === item._id && (
              <div className="px-5 pb-5 border-t border-white/5 pt-4">
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
