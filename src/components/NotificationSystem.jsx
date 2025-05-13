import { useState, useEffect } from 'react';

const NotificationSystem = ({ todos }) => {
  const [permission, setPermission] = useState('default');
  const [notifiedTasks, setNotifiedTasks] = useState([]);
  
  // Check notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);
  
  // Request notification permission
  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
    }
  };
  
  // Check for tasks due soon and send notifications
  useEffect(() => {
    if (permission !== 'granted' || !todos.length) return;
    
    // Check every minute
    const interval = setInterval(() => {
      const now = new Date();
      const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
      
      // Find tasks due in the next 5 minutes that haven't been notified yet
      const dueSoonTasks = todos.filter(todo => {
        if (!todo.dueDate || todo.completed) return false;
        
        const dueDate = new Date(todo.dueDate);
        const isInNext5Minutes = dueDate > now && dueDate <= fiveMinutesFromNow;
        const alreadyNotified = notifiedTasks.includes(todo.id);
        
        return isInNext5Minutes && !alreadyNotified;
      });
      
      // Send notifications for tasks due soon
      dueSoonTasks.forEach(todo => {
        const notification = new Notification('Task Due Soon', {
          body: todo.text,
          icon: '/favicon.ico', // Update with your favicon path
        });
        
        // Add to notified tasks
        setNotifiedTasks(prev => [...prev, todo.id]);
        
        // Close notification after 10 seconds
        setTimeout(() => notification.close(), 10000);
      });
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [permission, todos, notifiedTasks]);
  
  if (permission !== 'granted') {
    return (
      <div className="notification-permission">
        <p>
          Enable notifications to get reminders for your tasks.
        </p>
        <button onClick={requestPermission} className="btn-primary">
          Enable Notifications
        </button>
        <style jsx>{`
          .notification-permission {
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 20px;
            text-align: center;
          }
          
          .notification-permission p {
            margin-bottom: 10px;
          }
        `}</style>
      </div>
    );
  }
  
  return null; // No UI when notifications are enabled
};

export default NotificationSystem;
