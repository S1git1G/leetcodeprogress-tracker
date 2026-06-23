import React, { useState, useMemo } from 'react';
import { Plus, Search, Book, Trash2, Edit3, Code, FileText, Check } from 'lucide-react';

export default function ConceptNotes({ conceptNotes, onAddNote, onDeleteNote, onUpdateNote }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingId, setIsEditingId] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const noteData = {
      title: title.trim(),
      content: content.trim()
    };

    if (isEditingId) {
      onUpdateNote(isEditingId, noteData);
      setIsEditingId(null);
    } else {
      onAddNote(noteData);
    }

    setTitle('');
    setContent('');
    setShowAddForm(false);
  };

  const handleEditClick = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditingId(note.id);
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setTitle('');
    setContent('');
    setIsEditingId(null);
    setShowAddForm(false);
  };

  // Filter notes by search query
  const filteredNotes = useMemo(() => {
    return conceptNotes.filter(note => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conceptNotes, searchQuery]);

  // Check if content looks like a code snippet
  const hasCodeLines = (text) => {
    const codeIndicators = ['{', '}', ';', 'auto', 'map', 'vector', 'int ', 'void', 'for(', 'while(', 'std::', '#include', '//', '=>', 'const '];
    return codeIndicators.some(ind => text.includes(ind));
  };

  return (
    <div className="animate-fade">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Concept Notes</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Save general snippets, key code syntaxes, algorithms templates, and notes.</p>
        </div>
        
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>{showAddForm ? 'Hide Form' : 'Add Concept Note'}</span>
        </button>
      </div>

      {/* Add / Edit Form Card */}
      {showAddForm && (
        <div className="glass animate-slide" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', border: '1px solid var(--glass-border-focus)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isEditingId ? 'Edit Concept Note' : 'Add a New Concept Note'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Note Title *</label>
              <input 
                type="text" 
                placeholder="e.g. C++ Hashmaps: Auto Loop & Insertion" 
                className="input-control" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Concept Takeaway / Code Snippet *</label>
              <textarea 
                placeholder="Write down the snippet or concept. Code syntax is formatted cleanly automatically!&#10;e.g.&#10;unordered_map<string, int> mp;&#10;for (auto &p : mp) {&#10;    cout << p.first << ' : ' << p.second;&#10;}" 
                className="input-control"
                style={{ minHeight: '200px', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6 }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              {isEditingId && (
                <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
                  Cancel Edit
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {isEditingId ? 'Save Note' : 'Save Concept Note'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search */}
      <div className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search concept notes..." 
            className="input-control" 
            style={{ paddingLeft: '40px' }} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Concept Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="glass" style={{ padding: '4rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Book size={40} style={{ marginBottom: '1rem', strokeWidth: 1.5 }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>No concept notes found</h4>
          <p style={{ fontSize: '0.9rem' }}>Log syntaxes or templates (like "Map Incrementation" or "DFS DFS Structure") to reference later.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredNotes.map(note => {
            const isCode = hasCodeLines(note.content);
            return (
              <div 
                key={note.id} 
                className="glass" 
                style={{ 
                  borderRadius: 'var(--radius-lg)', 
                  display: 'flex', 
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                  border: '1px solid var(--glass-border)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.25)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
              >
                {/* Card Title Header */}
                <div style={{ 
                  padding: '1.25rem 1.5rem 0.75rem', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  borderBottom: '1px solid rgba(255,255,255,0.03)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isCode ? (
                      <Code size={16} style={{ color: 'var(--accent-primary)' }} />
                    ) : (
                      <FileText size={16} style={{ color: 'var(--accent-secondary)' }} />
                    )}
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{note.title}</h4>
                  </div>
                  
                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button 
                      onClick={() => handleEditClick(note)} 
                      className="btn btn-secondary btn-sm" 
                      style={{ padding: '0.3rem', borderRadius: '4px', background: 'transparent', border: 'none' }}
                      title="Edit Note"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm(`Delete concept note "${note.title}"?`)) {
                          onDeleteNote(note.id);
                        }
                      }} 
                      className="btn btn-danger btn-sm" 
                      style={{ padding: '0.3rem', borderRadius: '4px', background: 'transparent', border: 'none' }}
                      title="Delete Note"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Content Box */}
                <div style={{ 
                  padding: '1.25rem 1.5rem', 
                  flex: 1, 
                  background: isCode ? 'rgba(0,0,0,0.15)' : 'transparent',
                  fontFamily: isCode ? 'monospace' : 'inherit',
                  fontSize: isCode ? '0.85rem' : '0.9rem',
                  lineHeight: 1.6,
                  color: isCode ? '#e2e8f0' : 'var(--text-secondary)',
                  whiteSpace: 'pre-wrap',
                  overflowX: 'auto'
                }}>
                  {note.content}
                </div>

                {/* Date Footer */}
                <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'flex-end', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Created: {new Date(note.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
