import { useState } from 'react';
import TagSelector from './TagSelector';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState('medium');
  const [selectedTags, setSelectedTags] = useState([]);
  const [expanded, setExpanded] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!value.trim()) return;
    
    // Combine date and time if both are provided
    let dueDateISO = null;
    if (dueDate) {
      const dateObj = new Date(dueDate);
      if (dueTime) {
        const [hours, minutes] = dueTime.split(':');
        dateObj.setHours(parseInt(hours), parseInt(minutes));
      }
      dueDateISO = dateObj.toISOString();
    }
    
    addTodo({
      text: value.trim(),
      priority,
      dueDate: dueDateISO,
      tags: selectedTags,
    });
    
    // Reset form
    setValue('');
    setDueDate('');
    setDueTime('');
    setPriority('medium');
    setSelectedTags([]);
    setExpanded(false);
  };
  
  return (
    <form onSubmit={handleSubmit} className={`todo-form ${expanded ? 'expanded' : ''}`}>
      <div className="todo-form-main">
        <input
          type="text"
          className="todo-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a new task..."
          onFocus={() => setExpanded(true)}
        />
        <button type="submit" className="btn-primary add-btn">
          Add Task
        </button>
      </div>
      
      {expanded && (
        <div className="todo-form-details">
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dueTime">Due Time</label>
            <input
              type="time"
              id="dueTime"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              disabled={!dueDate}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="form-group tags-group">
            <label>Tags</label>
            <TagSelector 
              selectedTags={selectedTags} 
              onChange={setSelectedTags}
            />
          </div>
          
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => setExpanded(false)}
          >
            Cancel
          </button>
        </div>
      )}
      
      <style jsx>{`
        .todo-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
          background: var(--form-gradient);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .todo-form-main {
          display: flex;
          gap: 10px;
        }
        
        .todo-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(5px);
          border: 2px solid rgba(106, 17, 203, 0.1);
          transition: all 0.3s ease;
        }
        
        .todo-input:focus {
          border-color: rgba(106, 17, 203, 0.3);
          box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.1);
        }
        
        .add-btn {
          min-width: 120px;
          background: var(--button-gradient);
          transition: all 0.3s ease;
        }
        
        .todo-form-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          animation: fadeIn 0.3s ease;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group label {
          font-size: 0.9rem;
          color: #555;
          font-weight: 500;
        }
        
        .form-group input,
        .form-group select {
          padding: 10px 15px;
          border-radius: 8px;
          border: 2px solid rgba(106, 17, 203, 0.1);
          background: rgba(255, 255, 255, 0.9);
          font-family: inherit;
          transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus {
          border-color: rgba(106, 17, 203, 0.3);
          box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.1);
        }
        
        .priority-select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
        }
        
        .tags-group {
          grid-column: 1 / -1;
        }
        
        .cancel-btn {
          grid-column: 1 / -1;
          background: rgba(255, 255, 255, 0.9);
          color: #555;
          border: 2px solid rgba(106, 17, 203, 0.1);
          border-radius: 8px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .cancel-btn:hover {
          background: rgba(106, 17, 203, 0.05);
          border-color: rgba(106, 17, 203, 0.2);
        }
        
        @media (max-width: 768px) {
          .todo-form-details {
            grid-template-columns: 1fr;
          }
          
          .todo-form-main {
            flex-direction: column;
          }
          
          .add-btn {
            width: 100%;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </form>
  );
};

export default TodoForm;
