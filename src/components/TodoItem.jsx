import { useState } from 'react';
import ShareTaskModal from './ShareTaskModal';
import { defaultTags } from '../utils/tagsData';

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    if (editValue.trim()) {
      editTodo(todo.id, editValue.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditValue(todo.text);
      setIsEditing(false);
    }
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    const now = new Date();
    
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = new Date(now.setDate(now.getDate() + 1)).toDateString() === date.toDateString();
    
    let formattedDate = isToday ? 'Today' : isTomorrow ? 'Tomorrow' : 
      date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    if (date.getHours() || date.getMinutes()) {
      formattedDate += ` • ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    }
    
    return formattedDate;
  };

  const renderTags = () => {
    if (!todo.tags?.length) return null;
    return (
      <div className="todo-tags">
        {todo.tags.map(tagId => {
          const tag = defaultTags.find(t => t.id === tagId) || { name: 'Unknown', color: '#999' };
          return (
            <span 
              key={tagId} 
              className="todo-tag"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
      <div className="todo-content">
        {!isEditing ? (
          <>
            <div className="todo-checkbox-wrapper">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
                id={`todo-${todo.id}`}
              />
              <label htmlFor={`todo-${todo.id}`} className="checkbox-label"></label>
            </div>
            <div className="todo-details">
              <span className="todo-text">{todo.text}</span>
              {todo.dueDate && (
                <span className="todo-due-date">
                  📅 {formatDueDate(todo.dueDate)}
                </span>
              )}
              {renderTags()}
            </div>
          </>
        ) : (
          <input
            type="text"
            className="edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        )}
      </div>

      <div className="todo-actions">
        {!isEditing ? (
          <>
            <button
              className="share-btn"
              onClick={() => setShowShareModal(true)}
            >
              Share
            </button>
            <button
              className="edit-btn"
              onClick={handleEdit}
              disabled={todo.completed}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </>
        ) : (
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        )}
      </div>

      {showShareModal && (
        <ShareTaskModal 
          task={todo} 
          onClose={() => setShowShareModal(false)} 
        />
      )}

      <style jsx>{`
        .todo-item {
          background: ${todo.completed 
            ? 'var(--completed-item-gradient)' 
            : 'var(--todo-item-gradient)'};
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          animation: fadeIn 0.3s ease-out forwards;
          border-left: 4px solid;
        }

        .todo-item.priority-high { border-color: #ff4757 }
        .todo-item.priority-medium { border-color: #ffa502 }
        .todo-item.priority-low { border-color: #2ed573 }

        .todo-item:hover {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .todo-item.completed {
          opacity: 0.7;
          border-left-width: 2px;
        }

        .todo-content {
          display: flex;
          align-items: center;
          flex: 1;
          overflow: hidden;
          gap: 15px;
        }

        .todo-checkbox-wrapper {
          position: relative;
          flex-shrink: 0;
        }

        .todo-checkbox {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkbox-label {
          position: relative;
          display: inline-block;
          width: 22px;
          height: 22px;
          background: white;
          border: 2px solid #6a11cb;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .todo-checkbox:checked + .checkbox-label {
          background: #6a11cb;
        }

        .todo-checkbox:checked + .checkbox-label:after {
          content: '';
          position: absolute;
          left: 7px;
          top: 3px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .todo-details {
          flex: 1;
          min-width: 0;
        }

        .todo-text {
          font-size: 1rem;
          transition: all 0.2s ease;
          word-break: break-word;
          display: block;
        }

        .todo-due-date {
          display: block;
          font-size: 0.85rem;
          color: #666;
          margin-top: 6px;
        }

        .completed .todo-text {
          text-decoration: line-through;
          color: #666;
        }

        .edit-input {
          font-size: 1rem;
          padding: 8px 12px;
          margin-right: 10px;
          width: 100%;
        }

        .todo-actions {
          display: flex;
          gap: 8px;
          margin-left: 15px;
          flex-shrink: 0;
        }

        .todo-actions button {
          padding: 8px 15px;
          font-size: 0.85rem;
          border-radius: 6px;
          color: #fff;
          transition: all 0.2s ease;
          border: none;
        }

        .share-btn {
          background: linear-gradient(45deg, #3498db, #2980b9);
        }

        .edit-btn {
          background: var(--button-gradient);
        }

        .delete-btn {
          background: var(--danger-gradient);
        }

        .save-btn {
          background: var(--button-gradient);
        }

        .edit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .todo-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }

        .todo-tag {
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 12px;
          color: white;
          background: #666;
          display: inline-flex;
          align-items: center;
        }

        @media (max-width: 500px) {
          .todo-item {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .todo-actions {
            margin-left: 0;
            width: 100%;
            justify-content: flex-end;
          }

          .todo-actions button {
            flex: 1;
            padding: 10px;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px) }
          to { opacity: 1; transform: translateY(0) }
        }
      `}</style>
    </li>
  );
};

export default TodoItem;
