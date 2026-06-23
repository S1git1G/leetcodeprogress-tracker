import React, { useState, useMemo } from 'react';
import { RefreshCw, CheckCircle2, Calendar, Settings, AlertTriangle, ExternalLink } from 'lucide-react';

export default function RevisionCenter({ solvedLogs, onUpdateLog, revisionDays, setRevisionDays }) {
  const [tempDays, setTempDays] = useState(revisionDays);
  const [showSettings, setShowSettings] = useState(false);

  // 1. Calculate due problems
  const dueProblems = useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const revisionIntervalMs = revisionDays * 24 * 60 * 60 * 1000;

    // Track the latest log for each unique problem
    const latestLogs = new Map();
    solvedLogs.forEach(log => {
      const key = log.problem_name.trim().toLowerCase();
      const solveDate = new Date(log.solved_at);
      if (!latestLogs.has(key) || new Date(latestLogs.get(key).solved_at) < solveDate) {
        latestLogs.set(key, log);
      }
    });

    const list = [];
    latestLogs.forEach((log) => {
      const lastSolvedDate = new Date(log.solved_at);
      lastSolvedDate.setHours(0,0,0,0);
      const diffMs = today - lastSolvedDate;
      const daysSince = Math.floor(diffMs / (24 * 60 * 60 * 1000));
      
      if (diffMs >= revisionIntervalMs) {
        list.push({
          ...log,
          daysSince
        });
      }
    });

    // Sort: oldest solves first (needs revision most)
    return list.sort((a, b) => b.daysSince - a.daysSince);
  }, [solvedLogs, revisionDays]);

  const handleMarkRevised = (log) => {
    const todayStr = new Date().toISOString().split('T')[0];
    onUpdateLog(log.id, {
      solved_at: todayStr,
      revision_count: (log.revision_count || 0) + 1,
      last_revised_at: todayStr
    });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const days = parseInt(tempDays, 10);
    if (days >= 1) {
      setRevisionDays(days);
      localStorage.setItem('revision_days_config', days.toString());
      setShowSettings(false);
    }
  };

  return (
    <div className="animate-fade">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Revision Center</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Spaced repetition engine. Re-solve problems to build long-term muscle memory.</p>
        </div>
        
        <button 
          onClick={() => setShowSettings(!showSettings)} 
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Settings size={16} />
          <span>Configure Intervals</span>
        </button>
      </div>

      {/* Settings Card */}
      {showSettings && (
        <div className="glass animate-slide" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Revision Settings</h3>
          <form onSubmit={handleSaveSettings} style={{ display: 'flex', alignItems: 'end', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Revision Trigger Interval (Days)</label>
              <input 
                type="number" 
                min="1" 
                max="90" 
                className="input-control" 
                style={{ width: '120px' }}
                value={tempDays}
                onChange={(e) => setTempDays(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0.75rem 1.25rem' }}>
                Save Settings
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setTempDays(revisionDays);
                  setShowSettings(false);
                }} 
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.75rem 1.25rem' }}
              >
                Cancel
              </button>
            </div>
          </form>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            Default: 5 days. Problems solved this many days ago (or more) will trigger revision alerts.
          </p>
        </div>
      )}

      {/* Revision Queue List */}
      {dueProblems.length === 0 ? (
        <div className="glass" style={{ padding: '4rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', color: 'var(--text-muted)' }}>
          <CheckCircle2 size={48} style={{ color: 'var(--easy-color)', marginBottom: '1.25rem', strokeWidth: 1.5 }} />
          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Your Revision Queue is Empty!</h4>
          <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
            Awesome work! All your solved problems have been practiced recently. Check back in a few days.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Warning Banner */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.06)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            color: 'var(--medium-color)',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <AlertTriangle size={20} />
            <span>
              You have <strong>{dueProblems.length}</strong> {dueProblems.length === 1 ? 'problem' : 'problems'} that {dueProblems.length === 1 ? 'needs' : 'need'} revision. Practicing them again strengthens neural pathways!
            </span>
          </div>

          {/* List of problems */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {dueProblems.map(log => (
              <div 
                key={log.id} 
                className="glass" 
                style={{ 
                  padding: '1.25rem 1.5rem', 
                  borderRadius: 'var(--radius-md)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  borderLeft: '4px solid var(--medium-color)'
                }}
              >
                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className={`badge badge-${log.difficulty.toLowerCase()}`}>
                      {log.difficulty}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{log.problem_name}</h4>
                    <span style={{ fontSize: '0.75rem', padding: '2px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                      {log.topic}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} />
                      Last Solved: {new Date(log.solved_at).toLocaleDateString()} ({log.daysSince} days ago)
                    </span>
                    <span>•</span>
                    <span>Revised: {log.revision_count || 0} times</span>
                  </div>

                  {log.notes && (
                    <div style={{
                      marginTop: '0.5rem',
                      background: 'rgba(0,0,0,0.15)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      fontStyle: 'italic'
                    }}>
                      Takeaway Notes: "{log.notes}"
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {log.problem_url && (
                    <a 
                      href={log.problem_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ height: '36px' }}
                    >
                      <ExternalLink size={14} />
                      <span>Solve on LeetCode</span>
                    </a>
                  )}

                  <button 
                    onClick={() => handleMarkRevised(log)}
                    className="btn btn-primary btn-sm"
                    style={{ height: '36px' }}
                  >
                    <RefreshCw size={14} />
                    <span>Mark Revised (Today)</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
