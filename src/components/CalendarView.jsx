import { useState } from 'react';
import '../styles/CalendarView.css';

const CalendarView = ({ todos }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
  
  // Get days in current view
  const getDaysInView = () => {
    const days = [];
    const startDate = new Date(currentDate);
    
    if (viewMode === 'day') {
      return [new Date(currentDate)];
    } else if (viewMode === 'week') {
      // Set to start of week (Sunday)
      startDate.setDate(currentDate.getDate() - currentDate.getDay());
      
      // Get 7 days
      for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        days.push(day);
      }
    } else if (viewMode === 'month') {
      // Set to start of month
      startDate.setDate(1);
      
      // Set to start of week containing first day of month
      const firstDayOfMonth = new Date(startDate);
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
      
      // Get up to 42 days (6 weeks)
      for (let i = 0; i < 42; i++) {
        const day = new Date(firstDayOfMonth);
        day.setDate(firstDayOfMonth.getDate() + i);
        days.push(day);
        
        // Stop if we've gone past the end of the month and completed the week
        if (day.getMonth() !== startDate.getMonth() && day.getDay() === 6 && i >= 28) {
          break;
        }
      }
    }
    
    return days;
  };
  
  // Filter todos for specific date
  const getTodosForDate = (date) => {
    return todos.filter(todo => {
      if (!todo.dueDate) return false;
      
      const todoDate = new Date(todo.dueDate);
      return todoDate.getDate() === date.getDate() && 
             todoDate.getMonth() === date.getMonth() && 
             todoDate.getFullYear() === date.getFullYear();
    });
  };
  
  // Navigate between periods
  const navigate = (direction) => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + direction);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + direction * 7);
    } else if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    
    setCurrentDate(newDate);
  };
  
  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  const days = getDaysInView();
  
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => navigate(-1)} className="calendar-nav-btn">
          &larr;
        </button>
        
        <h3>
          {viewMode === 'day' ? formatDate(currentDate) : 
           viewMode === 'week' ? `${formatDate(days[0])} - ${formatDate(days[6])}` :
           currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        
        <button onClick={() => navigate(1)} className="calendar-nav-btn">
          &rarr;
        </button>
      </div>
      
      <div className="view-mode-selector">
        <button 
          className={`view-mode-btn ${viewMode === 'day' ? 'active' : ''}`}
          onClick={() => setViewMode('day')}
        >
          Day
        </button>
        <button 
          className={`view-mode-btn ${viewMode === 'week' ? 'active' : ''}`}
          onClick={() => setViewMode('week')}
        >
          Week
        </button>
        <button 
          className={`view-mode-btn ${viewMode === 'month' ? 'active' : ''}`}
          onClick={() => setViewMode('month')}
        >
          Month
        </button>
      </div>
      
      <div className={`calendar-grid ${viewMode}-view`}>
        {days.map((day, index) => {
          const todosForDay = getTodosForDate(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = day.toDateString() === new Date().toDateString();
          
          return (
            <div 
              key={index} 
              className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
            >
              <div className="day-header">
                {viewMode === 'month' && 
                  <span className="day-name">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                }
                <span className="day-number">{day.getDate()}</span>
              </div>
              
              <div className="day-todos">
                {todosForDay.length > 0 ? (
                  todosForDay.map(todo => (
                    <div 
                      key={todo.id} 
                      className={`calendar-todo ${todo.completed ? 'completed' : ''}`}
                    >
                      {todo.text}
                    </div>
                  ))
                ) : (
                  <div className="no-todos">No tasks</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
