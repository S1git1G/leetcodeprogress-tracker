import React, { useState, useMemo } from 'react';
import { Plus, Search, Calendar, ExternalLink, Trash2, Edit2, Download, Upload, AlertCircle } from 'lucide-react';
import { topicsList } from '../data/defaultProblems';

export default function DailyTracker({ solvedLogs, onAddLog, onDeleteLog, onUpdateLog, onImportBackup }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [topic, setTopic] = useState('Arrays');
  const [solvedAt, setSolvedAt] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isEditingId, setIsEditingId] = useState(null);

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const logData = {
      problem_name: name.trim(),
      problem_url: url.trim(),
      difficulty,
      topic,
      solved_at: solvedAt,
      notes: notes.trim()
    };

    if (isEditingId) {
      onUpdateLog(isEditingId, logData);
      setIsEditingId(null);
    } else {
      onAddLog(logData);
    }

    // Reset Form
    setName('');
    setUrl('');
    setDifficulty('Easy');
    setTopic('Arrays');
    setSolvedAt(new Date().toISOString().split('T')[0]);
    setNotes('');
    setShowAddForm(false);
  };

  const handleEditClick = (log) => {
    setName(log.problem_name);
    setUrl(log.problem_url || '');
    setDifficulty(log.difficulty);
    setTopic(log.topic);
    setSolvedAt(log.solved_at);
    setNotes(log.notes || '');
    setIsEditingId(log.id);
    setShowAddForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setName('');
    setUrl('');
    setDifficulty('Easy');
    setTopic('Arrays');
    setSolvedAt(new Date().toISOString().split('T')[0]);
    setNotes('');
    setIsEditingId(null);
    setShowAddForm(false);
  };

  // Filter & Search Logs
  const filteredLogs = useMemo(() => {
    return solvedLogs.filter(log => {
      const matchesSearch = log.problem_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (log.notes && log.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTopic = filterTopic ? log.topic === filterTopic : true;
      const matchesDifficulty = filterDifficulty ? log.difficulty === filterDifficulty : true;
      return matchesSearch && matchesTopic && matchesDifficulty;
    });
  }, [solvedLogs, searchQuery, filterTopic, filterDifficulty]);

  // Group Logs by Date
  const groupedLogs = useMemo(() => {
    const groups = {};
    // Sort logs by solved_at descending, then created_at descending
    const sorted = [...filteredLogs].sort((a, b) => {
      const dateDiff = new Date(b.solved_at) - new Date(a.solved_at);
      if (dateDiff !== 0) return dateDiff;
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });

    sorted.forEach(log => {
      const date = log.solved_at;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(log);
    });
    return groups;
  }, [filteredLogs]);

  // Format Date Header
  const formatDateHeader = (dateStr) => {
    const d = new Date(dateStr);
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (dateStr === todayStr) return 'Today';
    if (dateStr === yesterdayStr) return 'Yesterday';

    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Backup & Restore
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(solvedLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `leetjourney_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          onImportBackup(parsed);
        } else {
          alert('Invalid backup file. Must be a JSON array of logs.');
        }
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    fileReader.readAsText(file);
  };

  return (
    <div className="animate-fade">
      {/* Header and Backup Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Daily Progress Tracker</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Log your daily coding solves and keep key revision takeaways.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handleExport} className="btn btn-secondary btn-sm" title="Export progress to JSON file">
            <Download size={16} />
            <span>Export Backup</span>
          </button>
          
          <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }} title="Import progress from JSON backup file">
            <Upload size={16} />
            <span>Import Backup</span>
            <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          </label>

          <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>{showAddForm ? 'Hide Form' : 'Log Problem'}</span>
          </button>
        </div>
      </div>

      {/* Add / Edit Form Card */}
      {showAddForm && (
        <div className="glass animate-slide" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', border: '1px solid var(--glass-border-focus)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isEditingId ? 'Edit Solved Problem Log' : 'Log a Solved Problem'}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Problem Name *</label>
              <input 
                type="text" 
                placeholder="e.g. Two Sum" 
                className="input-control" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Question Link (LeetCode URL)</label>
              <input 
                type="url" 
                placeholder="e.g. https://leetcode.com/problems/..." 
                className="input-control" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Topic Category</label>
              <select className="input-control" value={topic} onChange={(e) => setTopic(e.target.value)}>
                {topicsList.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <select className="input-control" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date Solved</label>
              <input 
                type="date" 
                className="input-control" 
                value={solvedAt} 
                onChange={(e) => setSolvedAt(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Key Points / Takeaways (Write down notes to review later)</label>
              <textarea 
                placeholder="Write down the core trick, time complexity, or edge cases you want to remember..." 
                className="input-control"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              {isEditingId && (
                <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
                  Cancel Edit
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {isEditingId ? 'Save Changes' : 'Add to Log'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search problems or notes..." 
            className="input-control" 
            style={{ paddingLeft: '40px' }} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select className="input-control" value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)}>
          <option value="">All Topics</option>
          {topicsList.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select className="input-control" value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Grouped Logs Timeline */}
      {Object.keys(groupedLogs).length === 0 ? (
        <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', color: 'var(--text-muted)' }}>
          <AlertCircle size={40} style={{ marginBottom: '1rem', strokeWidth: 1.5 }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>No problems found</h4>
          <p style={{ fontSize: '0.9rem' }}>Try refining your search filters, or click "Log Problem" to log your first solved task!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {Object.keys(groupedLogs).map(date => (
            <div key={date} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Date Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Calendar size={16} style={{ color: 'var(--accent-primary)' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {formatDateHeader(date)}
                </h4>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
              </div>

              {/* Day's Solved Problems List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {groupedLogs[date].map(log => (
                  <div 
                    key={log.id} 
                    className="glass" 
                    style={{ 
                      padding: '1.25rem 1.5rem', 
                      borderRadius: 'var(--radius-md)', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '0.75rem',
                      transition: 'transform 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--glass-border)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <span className={`badge badge-${log.difficulty.toLowerCase()}`}>
                          {log.difficulty}
                        </span>
                        
                        <h5 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{log.problem_name}</h5>
                        
                        <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)' }}>
                          {log.topic}
                        </span>

                        {log.problem_url && (
                          <a 
                            href={log.problem_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: 'var(--accent-primary)', textDecoration: 'none', fontSize: '0.8rem' }}
                            title="Open Problem Link"
                          >
                            <span>View LeetCode</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => handleEditClick(log)} 
                          className="btn btn-secondary btn-sm" 
                          style={{ padding: '0.35rem', borderRadius: 'var(--radius-sm)' }}
                          title="Edit Log"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${log.problem_name}"?`)) {
                              onDeleteLog(log.id);
                            }
                          }} 
                          className="btn btn-danger btn-sm" 
                          style={{ padding: '0.35rem', borderRadius: 'var(--radius-sm)' }}
                          title="Delete Log"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Notes Box */}
                    {log.notes && (
                      <div style={{ 
                        background: 'rgba(0, 0, 0, 0.2)', 
                        padding: '0.75rem 1rem', 
                        borderRadius: 'var(--radius-sm)', 
                        borderLeft: '3px solid var(--accent-primary)',
                        fontSize: '0.9rem',
                        lineHeight: 1.5,
                        color: 'var(--text-secondary)',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {log.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
