import React from 'react';
import { LayoutDashboard, Calendar, BookOpen, RefreshCw, LogOut, Trophy } from 'lucide-react';
import supabase from '../supabaseClient';

export default function Sidebar({ activePage, setActivePage, user, solvedCount, totalProblems }) {
  const percentComplete = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'daily', name: 'Daily Tracker', icon: Calendar },
    { id: 'topics', name: 'Topic Sheets', icon: BookOpen },
    { id: 'revision', name: 'Revision Center', icon: RefreshCw },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error('Error signing out:', err.message);
    }
  };

  return (
    <div className="sidebar glass">
      <div className="sidebar-logo">
        <Trophy size={24} />
        <span>LeetJourney</span>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`sidebar-link ${activePage === item.id ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Progress tracker box in sidebar */}
      <div style={{ padding: '0 1rem', marginBottom: '1rem' }} className="sidebar-progress-container">
        <div className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            <span>Total Solved</span>
            <span>{solvedCount}/{totalProblems}</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${percentComplete}%`, 
                height: '100%', 
                background: 'var(--accent-gradient)', 
                borderRadius: '3px',
                transition: 'width 0.5s ease-out' 
              }} 
            />
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {percentComplete}% Done
          </div>
        </div>
      </div>

      {user && (
        <div className="sidebar-user">
          <div className="sidebar-user-info" title={user.email}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Logged in as:</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{user.email}</div>
          </div>
          <button onClick={handleSignOut} className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
