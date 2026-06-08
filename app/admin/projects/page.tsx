'use client';
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import Image from 'next/image';

interface Project {
  _id: string; title: string; description: string;
  techStack: string[]; githubUrl: string; demoUrl: string; image: string;
}
type FormState = Omit<Project, '_id'>;
const empty: FormState = { title: '', description: '', techStack: [], githubUrl: '', demoUrl: '', image: '' };

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState('');

  const fetchData = () =>
    fetch('/api/projects').then(r => r.json()).then(d => { setItems(d); setLoading(false); });

  useEffect(() => { fetchData(); }, []);

  const addTech = () => {
    if (!techInput.trim()) return;
    setForm({ ...form, techStack: [...form.techStack, techInput.trim()] });
    setTechInput('');
  };
  const removeTech = (i: number) => setForm({ ...form, techStack: form.techStack.filter((_, idx) => idx !== i) });

  const handleSubmit = async () => {
    if (!form.title) return;
    if (editId) {
      await fetch(`/api/projects/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setForm(empty); setShowForm(false); setEditId(null); setTechInput(''); fetchData();
  };

  const startEdit = (item: Project) => {
    setForm({ title: item.title, description: item.description, techStack: item.techStack, githubUrl: item.githubUrl, demoUrl: item.demoUrl, image: item.image });
    setEditId(item._id); setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (loading) return <div className="text-gray-500 text-sm">Loading...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Projects</h1>
          <p className="text-gray-500 text-sm">Manage your portfolio projects</p>
        </div>
        <button onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }} className="btn-primary">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-6 flex flex-col gap-4">
          <h3 className="font-semibold text-white text-sm">{editId ? 'Edit' : 'Add'} Project</h3>
          <div>
            <label className="form-label">Project Title</label>
            <input className="form-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="My AI Project" />
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea className="form-input" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="What does this project do?" />
          </div>
          <div>
            <label className="form-label">Tech Stack</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.techStack.map((t, i) => (
                <span key={i} className="badge flex items-center gap-1">
                  {t}
                  <button onClick={() => removeTech(i)} className="hover:text-red-400 ml-1"><X size={10} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input className="form-input flex-1" value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTech()} placeholder="e.g. Python, FastAPI" />
              <button onClick={addTech} className="btn-secondary px-3"><Plus size={15} /></button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">GitHub URL</label>
              <input className="form-input" value={form.githubUrl} onChange={e => setForm({...form, githubUrl: e.target.value})} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="form-label">Demo URL</label>
              <input className="form-input" value={form.demoUrl} onChange={e => setForm({...form, demoUrl: e.target.value})} placeholder="https://..." />
            </div>
          </div>
          <div>
            <label className="form-label">Project Image URL</label>
            <input className="form-input" value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://cloudinary.com/..." />
            <p className="text-xs text-gray-600 mt-1">Upload to Cloudinary and paste the URL</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSubmit} className="btn-primary"><Check size={16} /> {editId ? 'Update' : 'Add'}</button>
            <button onClick={() => { setShowForm(false); setEditId(null); setForm(empty); }} className="btn-secondary"><X size={16} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {items.length === 0 ? (
          <div className="glass-card p-10 text-center text-gray-500 text-sm col-span-2">No projects yet.</div>
        ) : items.map(item => (
          <div key={item._id} className="glass-card overflow-hidden flex flex-col">
            <div className="h-32 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 relative">
              {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" />}
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <h3 className="font-semibold text-white text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs line-clamp-2">{item.description}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.techStack.slice(0, 3).map(t => <span key={t} className="badge text-xs">{t}</span>)}
                {item.techStack.length > 3 && <span className="badge text-xs">+{item.techStack.length - 3}</span>}
              </div>
              <div className="flex gap-2 mt-auto pt-3">
                <button onClick={() => startEdit(item)} className="btn-secondary text-xs py-1.5 flex-1 justify-center"><Pencil size={12} /> Edit</button>
                <button onClick={() => handleDelete(item._id)} className="px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 text-xs hover:bg-red-500/10 transition-colors"><Trash2 size={12} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
