import React, { useMemo } from 'react';
import { Award, Zap, RefreshCw, BarChart2, Flame } from 'lucide-react';
import { topicsList } from '../data/defaultProblems';

export default function Dashboard({ solvedLogs, defaultProblems }) {
  // 1. Calculate Stats
  const totalCurated = defaultProblems.length;
  
  // Use a Set to store solved problem IDs/names to count unique problems
  const uniqueSolvedNames = useMemo(() => {
    const names = new Set();
    solvedLogs.forEach(log => names.add(log.problem_name.trim().toLowerCase()));
    return names;
  }, [solvedLogs]);

  const solvedCount = uniqueSolvedNames.size;

  // Difficulty Breakdown of all SOLVED problems in the logs
  const difficultyStats = useMemo(() => {
    const stats = { Easy: 0, Medium: 0, Hard: 0 };
    // To avoid double-counting duplicates of the same problem, we map problem name -> difficulty
    const solvedMap = new Map();
    solvedLogs.forEach(log => {
      solvedMap.set(log.problem_name.trim().toLowerCase(), log.difficulty);
    });
    solvedMap.forEach(difficulty => {
      if (stats[difficulty] !== undefined) {
        stats[difficulty]++;
      }
    });
    return stats;
  }, [solvedLogs]);

  // Streak Calculation
  const streak = useMemo(() => {
    if (solvedLogs.length === 0) return 0;
    
    // Extract unique solve dates sorted descending
    const solveDates = [...new Set(solvedLogs.map(log => log.solved_at))]
      .map(dateStr => new Date(dateStr))
      .sort((a, b) => b - a); // Newest first

    if (solveDates.length === 0) return 0;

    const today = new Date();
    today.setHours(0,0,0,0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const latestSolve = solveDates[0];
    latestSolve.setHours(0,0,0,0);

    // If the latest solve is not today or yesterday, streak is broken (0)
    if (latestSolve < yesterday) {
      return 0;
    }

    let activeStreak = 1;
    let currentDate = latestSolve;

    for (let i = 1; i < solveDates.length; i++) {
      const nextDate = solveDates[i];
      nextDate.setHours(0,0,0,0);

      // Check difference in days
      const diffTime = Math.abs(currentDate - nextDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        activeStreak++;
        currentDate = nextDate;
      } else if (diffDays > 1) {
        break; // Streak broken
      }
    }
    return activeStreak;
  }, [solvedLogs]);

  // Revision Queue Count (solved >= 5 days ago and not revised since)
  const revisionCount = useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

    // Track the latest solve for each unique problem
    const latestSolves = new Map();
    solvedLogs.forEach(log => {
      const name = log.problem_name.trim().toLowerCase();
      const solveDate = new Date(log.solved_at);
      if (!latestSolves.has(name) || latestSolves.get(name) < solveDate) {
        latestSolves.set(name, solveDate);
      }
    });

    let count = 0;
    latestSolves.forEach((lastSolvedDate) => {
      const diff = today - lastSolvedDate;
      if (diff >= FIVE_DAYS_MS) {
        count++;
      }
    });
    return count;
  }, [solvedLogs]);

  // 2. Topic Breakdown Progress
  const topicStats = useMemo(() => {
    return topicsList.map(topic => {
      const totalInTopic = defaultProblems.filter(p => p.topic === topic).length;
      
      // Count how many of these default problems have been solved
      const solvedInTopic = defaultProblems.filter(p => 
        p.topic === topic && 
        solvedLogs.some(log => log.problem_name.trim().toLowerCase() === p.name.trim().toLowerCase())
      ).length;

      const percent = totalInTopic > 0 ? Math.round((solvedInTopic / totalInTopic) * 100) : 0;
      return { topic, solved: solvedInTopic, total: totalInTopic, percent };
    });
  }, [solvedLogs, defaultProblems]);

  // 3. Heatmap Data (Last 16 weeks)
  const heatmapData = useMemo(() => {
    const cols = 16;
    const days = cols * 7;
    const cells = [];
    const today = new Date();
    
    // Map dates to solve counts
    const dateCounts = {};
    solvedLogs.forEach(log => {
      dateCounts[log.solved_at] = (dateCounts[log.solved_at] || 0) + 1;
    });

    // Start from the Sunday of 16 weeks ago
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days + 1);
    
    // Align to Sunday
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay);

    for (let i = 0; i < days; i++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + i);
      const dateStr = cellDate.toISOString().split('T')[0];
      const count = dateCounts[dateStr] || 0;
      
      let level = '0';
      if (count === 1) level = '1';
      else if (count === 2) level = '2';
      else if (count === 3) level = '3';
      else if (count >= 4) level = '4+';

      cells.push({
        date: dateStr,
        formattedDate: cellDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        count,
        level
      });
    }
    return cells;
  }, [solvedLogs]);

  // SVG Donut Chart Calculation
  const donutChart = useMemo(() => {
    const total = difficultyStats.Easy + difficultyStats.Medium + difficultyStats.Hard;
    if (total === 0) return null;

    const radius = 50;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;

    const easyPercent = difficultyStats.Easy / total;
    const mediumPercent = difficultyStats.Medium / total;
    const hardPercent = difficultyStats.Hard / total;

    const easyOffset = circumference;
    const mediumOffset = circumference - (easyPercent * circumference);
    const hardOffset = circumference - ((easyPercent + mediumPercent) * circumference);

    return {
      easyDash: `${easyPercent * circumference} ${circumference}`,
      mediumDash: `${mediumPercent * circumference} ${circumference}`,
      hardDash: `${hardPercent * circumference} ${circumference}`,
      easyOffset,
      mediumOffset,
      hardOffset,
      radius,
      strokeWidth,
      center: radius + strokeWidth
    };
  }, [difficultyStats]);

  return (
    <div className="animate-fade">
      {/* Top Welcome Heading */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome to your LeetCode prep engine. Track, revise, conquer.</p>
      </div>

      {/* Grid: 4 Metric Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        {/* Metric 1 */}
        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>
            <Award size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Problems Solved</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{solvedCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>curated sheet + custom logs</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--medium-color)' }}>
            <Flame size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Active Streak</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>{streak}</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{streak === 1 ? 'day' : 'days'}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>consecutive active days</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--hard-color)' }}>
            <RefreshCw size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Revision Queue</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{revisionCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>solved &gt;= 5 days ago</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--easy-color)' }}>
            <BarChart2 size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Curated Progress</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              {Math.round((defaultProblems.filter(p => solvedLogs.some(l => l.problem_name.toLowerCase() === p.name.toLowerCase())).length / totalCurated) * 100)}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>of curated DSA syllabus</div>
          </div>
        </div>
      </div>

      {/* Grid: Heatmap and Difficulty Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Heatmap Card */}
        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', minWidth: 0 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Solving Heatmap</h3>
          <div className="heatmap-container">
            <div className="heatmap">
              {heatmapData.map((cell, idx) => (
                <div
                  key={idx}
                  className="heatmap-cell"
                  data-count={cell.level}
                  style={{
                    backgroundColor: cell.count === 0 ? 'rgba(255,255,255,0.03)' :
                                    cell.count === 1 ? 'rgba(99, 102, 241, 0.25)' :
                                    cell.count === 2 ? 'rgba(99, 102, 241, 0.55)' :
                                    cell.count === 3 ? 'rgba(139, 92, 246, 0.8)' :
                                    'rgba(168, 85, 247, 1)'
                  }}
                >
                  <span className="tooltip">
                    {cell.count} solved on {cell.formattedDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Last 16 Weeks</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Less</span>
              <div style={{ width: '10px', height: '10px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '1px' }} />
              <div style={{ width: '10px', height: '10px', backgroundColor: 'rgba(99, 102, 241, 0.25)', borderRadius: '1px' }} />
              <div style={{ width: '10px', height: '10px', backgroundColor: 'rgba(99, 102, 241, 0.55)', borderRadius: '1px' }} />
              <div style={{ width: '10px', height: '10px', backgroundColor: 'rgba(139, 92, 246, 0.8)', borderRadius: '1px' }} />
              <div style={{ width: '10px', height: '10px', backgroundColor: 'rgba(168, 85, 247, 1)', borderRadius: '1px' }} />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown (Donut Chart) */}
        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', alignSelf: 'flex-start' }}>Difficulty</h3>
          
          {solvedCount === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
              <p style={{ fontSize: '0.9rem' }}>No data to show.</p>
              <p style={{ fontSize: '0.75rem' }}>Solve a problem to see breakdown.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '1.5rem' }}>
                <svg width="100%" height="100%" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="10" />
                  
                  {/* Easy segment */}
                  {difficultyStats.Easy > 0 && (
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke="var(--easy-color)"
                      strokeWidth="10"
                      strokeDasharray={donutChart?.easyDash}
                      transform="rotate(-90 60 60)"
                      strokeDashoffset="0"
                    />
                  )}
                  {/* Medium segment */}
                  {difficultyStats.Medium > 0 && (
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke="var(--medium-color)"
                      strokeWidth="10"
                      strokeDasharray={donutChart?.mediumDash}
                      transform="rotate(-90 60 60)"
                      strokeDashoffset={-(difficultyStats.Easy / (difficultyStats.Easy + difficultyStats.Medium + difficultyStats.Hard)) * 2 * Math.PI * 50}
                    />
                  )}
                  {/* Hard segment */}
                  {difficultyStats.Hard > 0 && (
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke="var(--hard-color)"
                      strokeWidth="10"
                      strokeDasharray={donutChart?.hardDash}
                      transform="rotate(-90 60 60)"
                      strokeDashoffset={-((difficultyStats.Easy + difficultyStats.Medium) / (difficultyStats.Easy + difficultyStats.Medium + difficultyStats.Hard)) * 2 * Math.PI * 50}
                    />
                  )}
                </svg>
                {/* Centered solved total */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{solvedCount}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Solved</div>
                </div>
              </div>

              {/* Legend with counts */}
              <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', gap: '0.5rem', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--easy-color)', fontWeight: 600 }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--easy-color)' }} />
                    Easy
                  </span>
                  <span style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{difficultyStats.Easy}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--medium-color)', fontWeight: 600 }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--medium-color)' }} />
                    Med
                  </span>
                  <span style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{difficultyStats.Medium}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--hard-color)', fontWeight: 600 }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--hard-color)' }} />
                    Hard
                  </span>
                  <span style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{difficultyStats.Hard}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Topic Wise Completion Cards */}
      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem' }}>Topic Wise Breakdown</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {topicStats.map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.topic}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {item.solved} / {item.total} solved
                </span>
              </div>
              <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  width: `${item.percent}%`,
                  height: '100%',
                  background: item.percent === 100 
                    ? 'linear-gradient(90deg, var(--easy-color) 0%, #34d399 100%)' 
                    : 'var(--accent-gradient)',
                  borderRadius: '3px',
                  transition: 'width 0.4s ease'
                }} />
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {item.percent}% Complete
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
