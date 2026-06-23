import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import Sidebar from './components/Sidebar';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import DailyTracker from './components/DailyTracker';
import TopicSheet from './components/TopicSheet';
import RevisionCenter from './components/RevisionCenter';
import RevisionModal from './components/RevisionModal';
import { defaultProblems } from './data/defaultProblems';

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [solvedLogs, setSolvedLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  
  // Revision days setting (default: 5)
  const [revisionDays, setRevisionDays] = useState(() => {
    const saved = localStorage.getItem('revision_days_config');
    return saved ? parseInt(saved, 10) : 5;
  });

  // 1. Listen to Auth Changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        // Trigger revision alert on login
        setShowRevisionModal(true);
      } else {
        setUser(null);
        setSolvedLogs([]);
      }
      setLoadingUser(false);
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 2. Fetch solved logs when user changes
  useEffect(() => {
    if (user) {
      fetchSolvedLogs();
    }
  }, [user]);

  const fetchSolvedLogs = async () => {
    setLoadingLogs(true);
    try {
      const { data, error } = await supabase
        .from('solved_logs')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setSolvedLogs(data || []);
    } catch (err) {
      console.error('Error fetching logs:', err.message);
    } finally {
      setLoadingLogs(false);
    }
  };

  // 3. Database Operations (CRUD)
  
  const handleAddLog = async (logData) => {
    try {
      const { data, error } = await supabase
        .from('solved_logs')
        .insert([{ ...logData, user_id: user.id }]);

      if (error) throw error;
      
      // Update state with newly inserted logs (Supabase v2 returns inserted data)
      if (data && data.length > 0) {
        setSolvedLogs(prev => [data[0], ...prev]);
      } else {
        // Fallback: refetch logs from db
        fetchSolvedLogs();
      }
    } catch (err) {
      console.error('Error adding log:', err.message);
      alert(`Failed to save log: ${err.message}`);
    }
  };

  const handleDeleteLog = async (id) => {
    try {
      const { error } = await supabase
        .from('solved_logs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSolvedLogs(prev => prev.filter(log => log.id !== id));
    } catch (err) {
      console.error('Error deleting log:', err.message);
      alert(`Failed to delete log: ${err.message}`);
    }
  };

  const handleUpdateLog = async (id, updatedFields) => {
    try {
      const { data, error } = await supabase
        .from('solved_logs')
        .update(updatedFields)
        .eq('id', id);

      if (error) throw error;

      // Update state local
      setSolvedLogs(prev => prev.map(log => 
        log.id === id ? { ...log, ...updatedFields } : log
      ));
    } catch (err) {
      console.error('Error updating log:', err.message);
      alert(`Failed to update log: ${err.message}`);
    }
  };

  const handleImportBackup = async (backupLogs) => {
    try {
      // Map logs to have current user's ID and clean properties
      const logsToInsert = backupLogs.map(log => ({
        problem_name: log.problem_name,
        problem_url: log.problem_url,
        difficulty: log.difficulty,
        topic: log.topic,
        solved_at: log.solved_at || new Date().toISOString().split('T')[0],
        notes: log.notes || '',
        revision_count: log.revision_count || 0,
        last_revised_at: log.last_revised_at || null,
        user_id: user.id
      }));

      const { error } = await supabase
        .from('solved_logs')
        .insert(logsToInsert);

      if (error) throw error;

      alert('Backup imported successfully!');
      fetchSolvedLogs(); // Refetch all
    } catch (err) {
      console.error('Error importing backup:', err.message);
      alert(`Failed to import backup: ${err.message}`);
    }
  };

  // 4. Render Active View Router
  const renderActiveView = () => {
    if (loadingLogs) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1rem', color: 'var(--text-secondary)' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--glass-border)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <span>Synchronizing with cloud...</span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      );
    }

    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard 
            solvedLogs={solvedLogs} 
            defaultProblems={defaultProblems} 
          />
        );
      case 'daily':
        return (
          <DailyTracker 
            solvedLogs={solvedLogs} 
            onAddLog={handleAddLog} 
            onDeleteLog={handleDeleteLog} 
            onUpdateLog={handleUpdateLog} 
            onImportBackup={handleImportBackup} 
          />
        );
      case 'topics':
        return (
          <TopicSheet 
            defaultProblems={defaultProblems} 
            solvedLogs={solvedLogs} 
            onAddLog={handleAddLog} 
            onDeleteLog={handleDeleteLog} 
            onUpdateLog={handleUpdateLog} 
          />
        );
      case 'revision':
        return (
          <RevisionCenter 
            solvedLogs={solvedLogs} 
            onUpdateLog={handleUpdateLog} 
            revisionDays={revisionDays} 
            setRevisionDays={setRevisionDays} 
          />
        );
      default:
        return <div>Page not found</div>;
    }
  };

  // 5. Render Loading State
  if (loadingUser) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--glass-border)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
          <div>Initializing LeetJourney...</div>
        </div>
      </div>
    );
  }

  // 6. Auth Gate
  if (!user) {
    return <Auth onAuthSuccess={(usr) => setUser(usr)} />;
  }

  // 7. Full App Shell
  return (
    <div className="app-container">
      {/* Background radial gradient circles */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="indigo-violet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        user={user} 
        solvedCount={new Set(solvedLogs.map(l => l.problem_name.trim().toLowerCase())).size} 
        totalProblems={defaultProblems.length} 
      />

      <main className="main-content">
        {renderActiveView()}
      </main>

      {/* Spaced repetition modal pop-up on start */}
      {showRevisionModal && (
        <RevisionModal 
          solvedLogs={solvedLogs} 
          revisionDays={revisionDays} 
          onClose={() => setShowRevisionModal(false)} 
          onNavigateToRevision={() => setActivePage('revision')} 
        />
      )}
    </div>
  );
}
