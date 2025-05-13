import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo, filter }) => {
  // Filter todos based on the selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });
  
  if (filteredTodos.length === 0) {
    return (
      <div className="empty-list">
        {todos.length === 0 ? (
          <p>You have no tasks yet. Add a task to get started!</p>
        ) : (
          <p>No {filter} tasks found.</p>
        )}
        <style jsx>{`
          .empty-list {
            text-align: center;
            padding: 30px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 10px;
            color: #666;
          }
        `}</style>
      </div>
    );
  }
  
  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
      <style jsx>{`
        .todo-list {
          list-style: none;
          padding: 0;
        }
      `}</style>
    </ul>
  );
};

export default TodoList;
