import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, CheckSquare, Square, FileText, ExternalLink, Plus, Info } from 'lucide-react';
import { topicsList } from '../data/defaultProblems';

export default function TopicSheet({ defaultProblems, solvedLogs, onAddLog, onDeleteLog, onUpdateLog }) {
  const [expandedTopic, setExpandedTopic] = useState('Arrays');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [activeProblem, setActiveProblem] = useState(null); // { name, difficulty, topic, logId, url }
  const [noteText, setNoteText] = useState('');

  // Track unique solves map: problem_name (lowercase) -> log object
  const solvedMap = useMemo(() => {
    const map = new Map();
    solvedLogs.forEach(log => {
      // Keep the latest solve log
      const key = log.problem_name.trim().toLowerCase();
      if (!map.has(key) || new Date(log.solved_at) > new Date(map.get(key).solved_at)) {
        map.set(key, log);
      }
    });
    return map;
  }, [solvedLogs]);

  // Toggle Accordion
  const toggleTopic = (topic) => {
    setExpandedTopic(expandedTopic === topic ? null : topic);
  };

  // Checkbox solve toggle
  const handleToggleSolve = (problem) => {
    const key = problem.name.trim().toLowerCase();
    const existingLog = solvedMap.get(key);

    if (existingLog) {
      if (window.confirm(`Unmark "${problem.name}" as solved? This will delete its solve entry and notes.`)) {
        onDeleteLog(existingLog.id);
      }
    } else {
      // Open Quick Notes Modal before saving
      setActiveProblem({
        name: problem.name,
        difficulty: problem.difficulty,
        topic: problem.topic,
        url: problem.url,
        logId: null
      });
      setNoteText('');
      setShowNoteModal(true);
    }
  };

  // View / Edit Notes for an ALREADY solved problem
  const handleViewNotes = (problem) => {
    const key = problem.name.trim().toLowerCase();
    const existingLog = solvedMap.get(key);

    if (existingLog) {
      setActiveProblem({
        name: problem.name,
        difficulty: problem.difficulty,
        topic: problem.topic,
        url: problem.url,
        logId: existingLog.id
      });
      setNoteText(existingLog.notes || '');
      setShowNoteModal(true);
    }
  };

  // Confirm Note Submission
  const handleSaveNotes = () => {
    if (!activeProblem) return;

    if (activeProblem.logId) {
      // Editing notes on an existing log
      onUpdateLog(activeProblem.logId, {
        notes: noteText.trim()
      });
    } else {
      // Creating a new log from checking off a problem
      onAddLog({
        problem_name: activeProblem.name,
        problem_url: activeProblem.url,
        difficulty: activeProblem.difficulty,
        topic: activeProblem.topic,
        solved_at: new Date().toISOString().split('T')[0],
        notes: noteText.trim()
      });
    }

    setShowNoteModal(false);
    setActiveProblem(null);
    setNoteText('');
  };

  // Add custom problem inside a topic
  const [customProblemName, setCustomProblemName] = useState('');
  const [customProblemUrl, setCustomProblemUrl] = useState('');
  const [customDifficulty, setCustomDifficulty] = useState('Easy');
  const [showCustomFormTopic, setShowCustomFormTopic] = useState(null);

  const handleAddCustomProblem = (e, topic) => {
    e.preventDefault();
    if (!customProblemName.trim()) return;

    // Immediately log it as solved today!
    onAddLog({
      problem_name: customProblemName.trim(),
      problem_url: customProblemUrl.trim(),
      difficulty: customDifficulty,
      topic: topic,
      solved_at: new Date().toISOString().split('T')[0],
      notes: 'Added custom solved problem.'
    });

    setCustomProblemName('');
    setCustomProblemUrl('');
    setCustomDifficulty('Easy');
    setShowCustomFormTopic(null);
  };

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Topic Sheets</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Master data structures topic-by-topic. Mark solved items to sync automatically.</p>
      </div>

      {/* Accordion Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {topicsList.map(topic => {
          const isExpanded = expandedTopic === topic;
          
          // Problems in this topic
          const topicProblems = defaultProblems.filter(p => p.topic === topic);
          
          // Count solved
          const solvedInTopicCount = topicProblems.filter(p => 
            solvedMap.has(p.name.trim().toLowerCase())
          ).length;
          
          const totalInTopicCount = topicProblems.length;
          const percentSolved = totalInTopicCount > 0 ? Math.round((solvedInTopicCount / totalInTopicCount) * 100) : 0;

          return (
            <div key={topic} className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {/* Accordion Header */}
              <div 
                onClick={() => toggleTopic(topic)}
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  background: isExpanded ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                  transition: 'background 0.2s',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, marginRight: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{topic}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '0.15rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                      {solvedInTopicCount} / {totalInTopicCount} Solved
                    </span>
                  </div>
                  
                  {/* Topic progress bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '350px' }}>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${percentSolved}%`,
                        height: '100%',
                        background: percentSolved === 100 ? 'var(--easy-color)' : 'var(--accent-primary)',
                        borderRadius: '2px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{percentSolved}%</span>
                  </div>
                </div>

                <div>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(0,0,0,0.1)' }}>
                  
                  {/* Problems list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {topicProblems.map((prob) => {
                      const isSolved = solvedMap.has(prob.name.trim().toLowerCase());
                      
                      return (
                        <div 
                          key={prob.id} 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.75rem 1rem',
                            background: isSolved ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255, 255, 255, 0.01)',
                            border: `1px solid ${isSolved ? 'rgba(16, 185, 129, 0.15)' : 'var(--glass-border)'}`,
                            borderRadius: 'var(--radius-md)',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {/* Left: Checkbox + Name + Link */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                            <button 
                              onClick={() => handleToggleSolve(prob)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0, color: isSolved ? 'var(--easy-color)' : 'var(--text-muted)' }}
                            >
                              {isSolved ? <CheckSquare size={20} /> : <Square size={20} />}
                            </button>
                            
                            <span className={`badge badge-${prob.difficulty.toLowerCase()}`}>
                              {prob.difficulty}
                            </span>
                            
                            <span style={{ 
                              fontWeight: 500, 
                              fontSize: '0.95rem',
                              textDecoration: isSolved ? 'line-through' : 'none',
                              color: isSolved ? 'var(--text-muted)' : 'var(--text-primary)',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {prob.name}
                            </span>

                            {prob.url && (
                              <a 
                                href={prob.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-primary)', textDecoration: 'none' }}
                                title="Open in LeetCode"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                          </div>

                          {/* Right: Notes button */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {isSolved && (
                              <button 
                                onClick={() => handleViewNotes(prob)}
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '0.4rem 0.6rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                                title="View/Edit problem notes"
                              >
                                <FileText size={14} />
                                <span style={{ fontSize: '0.8rem' }}>Takeaway Notes</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Custom Problem Button inside topic */}
                  <div style={{ marginTop: '0.75rem' }}>
                    {showCustomFormTopic === topic ? (
                      <form 
                        onSubmit={(e) => handleAddCustomProblem(e, topic)}
                        style={{
                          background: 'rgba(0,0,0,0.2)',
                          padding: '1rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--glass-border)',
                          display: 'grid',
                          gridTemplateColumns: '2fr 2fr 1fr 1fr',
                          gap: '0.75rem',
                          alignItems: 'end'
                        }}
                      >
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Custom Problem Name *</label>
                          <input 
                            type="text" 
                            className="input-control" 
                            placeholder="e.g. Rotate Image"
                            value={customProblemName}
                            onChange={(e) => setCustomProblemName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">LeetCode Link</label>
                          <input 
                            type="url" 
                            className="input-control" 
                            placeholder="https://..."
                            value={customProblemUrl}
                            onChange={(e) => setCustomProblemUrl(e.target.value)}
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Difficulty</label>
                          <select 
                            className="input-control" 
                            value={customDifficulty} 
                            onChange={(e) => setCustomDifficulty(e.target.value)}
                          >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                          </select>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button type="submit" className="btn btn-primary btn-sm" style={{ flex: 1, padding: '0.65rem' }}>
                            Save
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setShowCustomFormTopic(null)} 
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.65rem' }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button 
                        onClick={() => setShowCustomFormTopic(topic)}
                        className="btn btn-secondary btn-sm"
                        style={{ borderStyle: 'dashed', width: '100%', justifyContent: 'center' }}
                      >
                        <Plus size={14} />
                        <span>Log a Custom Problem under {topic}</span>
                      </button>
                    )}
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Notes Modal */}
      {showNoteModal && activeProblem && (
        <div className="modal-overlay">
          <div className="modal-content glass">
            <div className="modal-header">
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} style={{ color: 'var(--accent-primary)' }} />
                <span>Notes: {activeProblem.name}</span>
              </h4>
              <span className={`badge badge-${activeProblem.difficulty.toLowerCase()}`}>
                {activeProblem.difficulty}
              </span>
            </div>
            
            <div className="modal-body">
              <div style={{ 
                padding: '0.75rem', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Info size={16} />
                <span>Write down core logic, edge cases, time/space complexity, or revision tips.</span>
              </div>
              
              <div className="form-group" style={{ marginBottom: 0 }}>
                <textarea 
                  className="input-control" 
                  style={{ minHeight: '180px' }}
                  placeholder="e.g., Optimal Approach: Use two pointers. Keep tracks of left and right index. Time Complexity: O(N), Space Complexity: O(1)..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                onClick={() => {
                  setShowNoteModal(false);
                  setActiveProblem(null);
                  setNoteText('');
                }} 
                className="btn btn-secondary"
              >
                Close
              </button>
              <button onClick={handleSaveNotes} className="btn btn-primary">
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
