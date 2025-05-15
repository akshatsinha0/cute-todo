import { useState, useEffect, useCallback } from 'react';
import TypewriterHeading from './components/TypewriterHeading';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import CookieConsent from './components/CookieConsent';
import CalendarView from './components/CalendarView';
import NotificationSystem from './components/NotificationSystem';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Sidebar from './components/Sidebar';
import './index.css';
import './styles/CalendarView.css';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  // Main application state
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });
  
  // UI state
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  

  const addTodo = useCallback((todoData) => {
    const newTodo = {
      id: Date.now(),
      text: typeof todoData === 'string' ? todoData : todoData.text,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: todoData.priority || 'medium',
      dueDate: todoData.dueDate || null,
      tags: todoData.tags || [],
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  }, []);

  // Handle shared tasks from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedTask = urlParams.get('share');
    
    if (sharedTask) {
      try {
        const decodedTask = JSON.parse(atob(sharedTask));
        addTodo(decodedTask);
        
        // Clear the URL parameter after processing
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.error('Error parsing shared task:', error);
      }
    }
  }, [addTodo]);
  
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { 
          ...todo, 
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date().toISOString() : null 
        } : todo
      )
    );
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const editTodo = (id, newText) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };
  
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };
  
  // Calculate statistics
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const activeTasks = totalTasks - completedTasks;
  
  return (
    <AuthProvider>
    <Sidebar />
    <div className="container">
      <div className="app-container">
      <TypewriterHeading />


        <div className="app-header">
          <h1>Elegant Tasks</h1>
          <p>Organize your life with style</p>
          
          <div className="view-toggle">
            <button 
              className={`view-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              List View
            </button>
            <button 
              className={`view-btn ${view === 'calendar' ? 'active' : ''}`}
              onClick={() => setView('calendar')}
            >
              Calendar View
            </button>
          </div>
        </div>
        
        <NotificationSystem todos={todos} />
        
        <div className="app-stats">
          <div className="stat">
            <span className="stat-value">{totalTasks}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-value">{activeTasks}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat">
            <span className="stat-value">{completedTasks}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        
        <TodoForm addTodo={addTodo} />
        
        {view === 'list' ? (
          <TodoList 
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            filter={filter}
          />
        ) : (
          <CalendarView 
            todos={todos} 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        )}
        
        {view === 'list' && (
          <TodoFilter 
            filter={filter}
            setFilter={setFilter}
            clearCompleted={clearCompleted}
            todos={todos}
          />
        )}
        
        <AnalyticsDashboard todos={todos} />
      </div>
      
      <CookieConsent />
      
      <style jsx>{`
        .app-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 30px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          padding: 15px;
        }
        
        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 15px;
          border-radius: 8px;
          background: var(--todo-item-gradient);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          min-width: 80px;
        }
        
        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          background: var(--secondary-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: #666;
          margin-top: 5px;
        }
        
        .view-toggle {
          display: flex;
          justify-content: center;
          margin: 20px 0;
          gap: 10px;
        }
        
        .view-btn {
          background: transparent;
          padding: 10px 20px;
          border-radius: 8px;
          border: 1px solid rgba(106, 17, 203, 0.3);
          color: #555;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .view-btn.active {
          background: var(--button-gradient);
          color: white;
          border-color: transparent;
          box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);
        }
        
        .view-btn:hover:not(.active) {
          background: rgba(106, 17, 203, 0.1);
        }
        
        @media (max-width: 600px) {
          .app-stats {
            flex-wrap: wrap;
            gap: 10px;
          }
          
          .stat {
            flex: 1;
            min-width: 60px;
          }
          
          .view-toggle {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
    </AuthProvider>
  );
};

export default App;