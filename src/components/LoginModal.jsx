import { useState } from 'react';
import { loginUser } from '../firebase';
import '../styles/sidebar.css';

const LoginModal = ({ onClose, showSignupModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await loginUser(email, password);
      onClose();
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    onClose();
    showSignupModal();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Welcome Back</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <div className="form-footer">
            Don't have an account?{' '}
            <a href="#signup" onClick={handleSignupClick}>Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
