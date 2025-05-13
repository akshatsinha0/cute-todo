const TodoFilter = ({ filter, setFilter, clearCompleted, todos }) => {
    const hasCompletedTodos = todos.some(todo => todo.completed);
    
    return (
      <div className="todo-filter">
        <div className="filter-options">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        
        <button 
          className="clear-btn"
          onClick={clearCompleted}
          disabled={!hasCompletedTodos}
        >
          Clear Completed
        </button>
        <style jsx>{`
          .todo-filter {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 10px;
            margin-top: 20px;
            flex-wrap: wrap;
            gap: 15px;
          }
          
          .filter-options {
            display: flex;
            gap: 10px;
          }
          
          .filter-btn {
            background: transparent;
            color: #555;
            font-weight: 500;
            padding: 6px 12px;
            border-radius: 6px;
            transition: all 0.2s ease;
          }
          
          .filter-btn:hover, .filter-btn.active {
            background: rgba(106, 17, 203, 0.1);
            color: #6a11cb;
          }
          
          .filter-btn.active {
            font-weight: 600;
          }
          
          .clear-btn {
            background: transparent;
            color: #ff5e62;
            font-weight: 500;
            padding: 6px 12px;
            border-radius: 6px;
            transition: all 0.2s ease;
          }
          
          .clear-btn:hover:not(:disabled) {
            background: rgba(255, 94, 98, 0.1);
          }
          
          .clear-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          @media (max-width: 600px) {
            .todo-filter {
              flex-direction: column;
              align-items: stretch;
            }
            
            .filter-options {
              justify-content: center;
            }
          }
        `}</style>
      </div>
    );
  };
  
  export default TodoFilter;
  