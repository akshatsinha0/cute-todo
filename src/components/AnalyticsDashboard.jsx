import { useState, useEffect } from 'react';

const AnalyticsDashboard = ({ todos }) => {
  const [stats, setStats] = useState({
    completionRate: 0,
    priorityDistribution: { low: 0, medium: 0, high: 0 },
    tagsDistribution: {},
    weeklyProgress: Array(7).fill(0),
  });
  
  useEffect(() => {
    if (!todos.length) return;
    
    // Calculate completion rate
    const completedCount = todos.filter(todo => todo.completed).length;
    const completionRate = (completedCount / todos.length) * 100;
    
    // Calculate priority distribution
    const priorityDistribution = {
      low: 0,
      medium: 0,
      high: 0,
    };
    
    todos.forEach(todo => {
      const priority = todo.priority || 'medium';
      priorityDistribution[priority]++;
    });
    
    // Calculate tags distribution
    const tagsDistribution = {};
    
    todos.forEach(todo => {
      if (todo.tags && todo.tags.length) {
        todo.tags.forEach(tagId => {
          if (tagsDistribution[tagId]) {
            tagsDistribution[tagId]++;
          } else {
            tagsDistribution[tagId] = 1;
          }
        });
      }
    });
    
    // Calculate weekly progress (completed tasks per day of current week)
    const weeklyProgress = Array(7).fill(0);
    
    todos.forEach(todo => {
      if (todo.completed && todo.completedAt) {
        const completedDate = new Date(todo.completedAt);
        const dayOfWeek = completedDate.getDay();
        weeklyProgress[dayOfWeek]++;
      }
    });
    
    setStats({
      completionRate,
      priorityDistribution,
      tagsDistribution,
      weeklyProgress,
    });
  }, [todos]);
  
  const renderProgressBar = (value, maxValue, color) => {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
    
    return (
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ 
            width: `${percentage}%`,
            background: color,
          }}
        />
      </div>
    );
  };
  
  const maxPriorityCount = Math.max(
    stats.priorityDistribution.low,
    stats.priorityDistribution.medium,
    stats.priorityDistribution.high
  );
  
  const maxWeeklyCount = Math.max(...stats.weeklyProgress);
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="analytics-dashboard">
      <h3 className="dashboard-title">Task Analytics</h3>
      
      <div className="stats-grid">
        <div className="stat-card completion-rate">
          <h4>Completion Rate</h4>
          <div className="completion-circle">
            <span className="completion-text">
              {Math.round(stats.completionRate)}%
            </span>
          </div>
        </div>
        
        <div className="stat-card priority-distribution">
          <h4>Priority Distribution</h4>
          <div className="priority-bars">
            <div className="priority-bar-item">
              <span className="priority-label">High</span>
              {renderProgressBar(
                stats.priorityDistribution.high,
                maxPriorityCount,
                'var(--danger-gradient)'
              )}
              <span className="priority-count">{stats.priorityDistribution.high}</span>
            </div>
            
            <div className="priority-bar-item">
              <span className="priority-label">Medium</span>
              {renderProgressBar(
                stats.priorityDistribution.medium,
                maxPriorityCount,
                'var(--secondary-gradient)'
              )}
              <span className="priority-count">{stats.priorityDistribution.medium}</span>
            </div>
            
            <div className="priority-bar-item">
              <span className="priority-label">Low</span>
              {renderProgressBar(
                stats.priorityDistribution.low,
                maxPriorityCount,
                'linear-gradient(to right, #4caf50, #8bc34a)'
              )}
              <span className="priority-count">{stats.priorityDistribution.low}</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card weekly-progress">
          <h4>Weekly Progress</h4>
          <div className="weekly-chart">
            {stats.weeklyProgress.map((count, index) => (
              <div key={index} className="day-column">
                <div 
                  className="day-bar" 
                  style={{ 
                    height: `${maxWeeklyCount > 0 ? (count / maxWeeklyCount) * 100 : 0}%` 
                  }}
                >
                  {count > 0 && <span className="day-count">{count}</span>}
                </div>
                <span className="day-label">{days[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .analytics-dashboard {
          background: var(--form-gradient);
          border-radius: 12px;
          padding: 20px;
          margin-top: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .dashboard-title {
          text-align: center;
          margin-bottom: 20px;
          background: var(--secondary-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 600;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        }
        
        .stat-card h4 {
          margin-bottom: 15px;
          color: #555;
          font-weight: 600;
          text-align: center;
        }
        
        .completion-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: conic-gradient(
            var(--button-gradient) ${stats.completionRate}%, 
            #eee ${stats.completionRate}% 100%
          );
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .completion-circle::before {
          content: '';
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: white;
        }
        
        .completion-text {
          position: relative;
          z-index: 1;
          font-size: 1.5rem;
          font-weight: 700;
          color: #6a11cb;
        }
        
        .priority-bars {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .priority-bar-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .priority-label {
          width: 60px;
          font-size: 0.85rem;
          color: #555;
        }
        
        .progress-bar-container {
          flex: 1;
          height: 8px;
          background: #eee;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }
        
        .priority-count {
          width: 30px;
          font-size: 0.85rem;
          text-align: right;
          color: #666;
        }
        
        .weekly-chart {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 150px;
        }
        
        .day-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 30px;
        }
        
        .day-bar {
          width: 20px;
          background: var(--button-gradient);
          border-radius: 4px 4px 0 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 1px;
          transition: height 0.5s ease;
        }
        
        .day-count {
          color: white;
          font-size: 0.7rem;
          padding-top: 2px;
        }
        
        .day-label {
          margin-top: 5px;
          font-size: 0.75rem;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .weekly-chart {
            height: 120px;
          }
          
          .day-column {
            width: 25px;
          }
          
          .day-bar {
            width: 15px;
          }
          
          .day-label {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AnalyticsDashboard;
    