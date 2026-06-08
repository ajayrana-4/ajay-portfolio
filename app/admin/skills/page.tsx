'use client';
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';

const CATEGORIES = ['AI & GenAI', 'Backend', 'Databases', 'DevOps', 'Tools'];

interface Skill { _id: string; name: string; category: string; }

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', category: 'AI & GenAI' });
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: '', category: '' });

  const fetchSkills = () =>
    fetch('/api/skills').then(r => r.json()).then(d => { setSkills(d); setLoading(false); });

  useEffect(() => { fetchSkills(); }, []);

  const handleAdd = async () => {
    if (!newSkill.name.trim()) return;
    await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSkill),
    });
    setNewSkill({ name: '', category: 'AI & GenAI' });
    setAdding(false);
    fetchSkills();
  };

  const handleEdit = async (id: string) => {
    await fetch(`/api/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    });
    setEditId(null);
    fetchSkills();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    fetchSkills();
  };

  const grouped: Record<string, Skill[]> = {};
  CATEGORIES.forEach(c => { grouped[c] = skills.filter(s => s.category === c); });

  if (loading) return <div className="text-gray-500 text-sm">Loading...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Skills</h1>
          <p className="text-gray-500 text-sm">Manage your technical skills by category</p>
        </div>
        <button onClick={() => setAdding(true)} className="btn-primary">
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="glass-card p-5 mb-6 flex gap-3 items-end">
          <div className="flex-1">
            <label className="form-label">Skill Name</label>
            <input
              className="form-input"
              value={newSkill.name}
              onChange={e => setNewSkill({...newSkill, name: e.target.value})}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="e.g. LangChain"
              autoFocus
            />
          </div>
          <div className="w-44">
            <label className="form-label">Category</label>
            <select
              className="form-input"
              value={newSkill.category}
              onChange={e => setNewSkill({...newSkill, category: e.target.value})}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={handleAdd} className="btn-primary h-[38px] px-3"><Check size={16} /></button>
          <button onClick={() => setAdding(false)} className="btn-secondary h-[38px] px-3"><X size={16} /></button>
        </div>
      )}

      {/* Skills grouped by category */}
      {CATEGORIES.map(cat => {
        const catSkills = grouped[cat];
        if (catSkills.length === 0) return null;
        return (
          <div key={cat} className="glass-card mb-4 overflow-hidden">
            <div className="px-5 py-3 border-b border-white/5">
              <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{cat}</h3>
            </div>
            {catSkills.map(skill => (
              <div key={skill._id} className="table-row grid-cols-[1fr_auto] border-b border-white/5 last:border-0">
                {editId === skill._id ? (
                  <div className="flex gap-2 items-center">
                    <input
                      className="form-input flex-1 py-1.5 text-sm"
                      value={editData.name}
                      onChange={e => setEditData({...editData, name: e.target.value})}
                      onKeyDown={e => e.key === 'Enter' && handleEdit(skill._id)}
                      autoFocus
                    />
                    <select
                      className="form-input w-36 py-1.5 text-sm"
                      value={editData.category}
                      onChange={e => setEditData({...editData, category: e.target.value})}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button onClick={() => handleEdit(skill._id)} className="text-green-400 hover:text-green-300 p-1"><Check size={15} /></button>
                    <button onClick={() => setEditId(null)} className="text-gray-500 hover:text-gray-300 p-1"><X size={15} /></button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{skill.name}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => { setEditId(skill._id); setEditData({ name: skill.name, category: skill.category }); }}
                        className="p-1.5 rounded text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="p-1.5 rounded text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}

      {skills.length === 0 && (
        <div className="glass-card p-10 text-center text-gray-500 text-sm">
          No skills yet. Click "Add Skill" to get started.
        </div>
      )}
    </div>
  );
}
