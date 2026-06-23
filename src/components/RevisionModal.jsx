import React, { useMemo } from 'react';
import { AlertTriangle, X, RefreshCw, ChevronRight } from 'lucide-react';

export default function RevisionModal({ solvedLogs, revisionDays, onClose, onNavigateToRevision }) {
  
  // Calculate if there are any due problems
  const dueProblemsList = useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const revisionIntervalMs = revisionDays * 24 * 60 * 60 * 1000;

    // Map: problem_name -> latest solve log
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

    // Show top 3 oldest solved items that need revision most
    return list.sort((a, b) => b.daysSince - a.daysSince).slice(0, 3);
  }, [solvedLogs, revisionDays]);

  if (dueProblemsList.length === 0) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="modal-content glass animate-slide" style={{ maxWidth: '500px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
        
        {/* Header */}
        <div className="modal-header" style={{ background: 'rgba(245, 158, 11, 0.05)', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--medium-color)' }}>
            <AlertTriangle size={22} />
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Revision Reminder!</h4>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: '1.5rem' }}>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Hey coding champion! You solved these problems **{revisionDays} or more days ago**. Re-solve them now to secure your understanding.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {dueProblemsList.map((log) => (
              <div 
                key={log.id} 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  border: '1px solid var(--glass-border)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className={`badge badge-${log.difficulty.toLowerCase()}`} style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                      {log.difficulty}
                    </span>
                    {log.problem_name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Solved {log.daysSince} days ago • {log.topic}
                  </div>
                </div>
                
                {log.problem_url && (
                  <a 
                    href={log.problem_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem' }}
                    title="Solve on LeetCode"
                  >
                    <ChevronRight size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
            "Repetition is the mother of learning, the father of action, which makes it the architect of accomplishment."
          </p>
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Remind Me Later
          </button>
          <button 
            onClick={() => {
              onNavigateToRevision();
              onClose();
            }} 
            className="btn btn-primary btn-sm"
            style={{ background: 'var(--accent-gradient)' }}
          >
            <RefreshCw size={14} />
            <span>Go to Revision Center</span>
          </button>
        </div>

      </div>
    </div>
  );
}
