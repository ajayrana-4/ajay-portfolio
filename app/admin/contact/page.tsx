'use client';
import { useState, useEffect } from 'react';
import { Save, CheckCircle, Mail, Clock, Eye } from 'lucide-react';

interface ContactData { email: string; linkedinUrl: string; githubUrl: string; contactFormEnabled: boolean; }
interface Message { _id: string; name: string; email: string; message: string; read: boolean; createdAt: string; }

export default function AdminContactPage() {
  const [form, setForm] = useState<ContactData>({ email: '', linkedinUrl: '', githubUrl: '', contactFormEnabled: true });
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingContact, setLoadingContact] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'messages'>('settings');
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    fetch('/api/contact').then(r => r.json()).then(d => {
      setForm({ email: d.email || '', linkedinUrl: d.linkedinUrl || '', githubUrl: d.githubUrl || '', contactFormEnabled: d.contactFormEnabled ?? true });
      setLoadingContact(false);
    });
    fetch('/api/messages').then(r => r.json()).then(d => { setMessages(d); setLoadingMessages(false); });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/contact', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Contact</h1>
        <p className="text-gray-500 text-sm">Manage contact info and view messages</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-6 w-fit">
        {(['settings', 'messages'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === tab ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {tab}
            {tab === 'messages' && messages.length > 0 && (
              <span className="ml-2 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">{messages.length}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'settings' ? (
        <div className="glass-card p-6 flex flex-col gap-5">
          <div className="flex justify-end">
            <button onClick={handleSave} disabled={saving} className="btn-primary">
              {saved ? <><CheckCircle size={16} /> Saved!</> : saving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
            </button>
          </div>
          <div>
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="ajay@ajayrana.in" />
          </div>
          <div>
            <label className="form-label">LinkedIn URL</label>
            <input className="form-input" value={form.linkedinUrl} onChange={e => setForm({...form, linkedinUrl: e.target.value})} placeholder="https://linkedin.com/in/..." />
          </div>
          <div>
            <label className="form-label">GitHub URL</label>
            <input className="form-input" value={form.githubUrl} onChange={e => setForm({...form, githubUrl: e.target.value})} placeholder="https://github.com/..." />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/[0.02]">
            <div>
              <p className="text-sm font-medium text-white">Contact Form</p>
              <p className="text-xs text-gray-500 mt-0.5">Allow visitors to send you messages</p>
            </div>
            <button
              onClick={() => setForm({...form, contactFormEnabled: !form.contactFormEnabled})}
              className={`w-11 h-6 rounded-full transition-colors relative ${form.contactFormEnabled ? 'bg-indigo-500' : 'bg-white/10'}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.contactFormEnabled ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
        </div>
      ) : (
        <div>
          {selected ? (
            <div className="glass-card p-6">
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-xs mb-5 flex items-center gap-1">← Back to inbox</button>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{selected.name}</h3>
                  <p className="text-indigo-400 text-sm">{selected.email}</p>
                </div>
                <span className="text-gray-600 text-xs">{new Date(selected.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5">
                <p className="text-gray-300 text-sm leading-relaxed">{selected.message}</p>
              </div>
              <a href={`mailto:${selected.email}`} className="btn-primary mt-4">
                <Mail size={14} /> Reply
              </a>
            </div>
          ) : (
            <div className="glass-card overflow-hidden">
              {loadingMessages ? (
                <div className="p-10 text-center text-gray-500 text-sm">Loading messages...</div>
              ) : messages.length === 0 ? (
                <div className="p-10 text-center text-gray-500 text-sm">No messages yet.</div>
              ) : messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => setSelected(msg)}
                  className="table-row grid-cols-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold flex-shrink-0">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{msg.name}</p>
                        <p className="text-gray-500 text-xs line-clamp-1">{msg.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-xs flex-shrink-0 ml-4">
                      <Clock size={11} />
                      {new Date(msg.createdAt).toLocaleDateString()}
                      <Eye size={13} className="text-gray-600 ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
