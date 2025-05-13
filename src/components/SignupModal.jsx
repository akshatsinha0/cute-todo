import { useState } from 'react';
import { registerUser } from '../firebase';
import '../styles/sidebar.css';

const SignupModal = ({ onClose, showLoginModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      await registerUser(email, password, name);
      onClose();
    } catch (err) {
      setError(`Registration failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLoginClick = (e) => {
    e.preventDefault();
    onClose();
    showLoginModal();
  };
  
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Account</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="signup-name">Full Name</label>
            <input 
              type="text" 
              id="signup-name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input 
              type="email" 
              id="signup-email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <input 
              type="password" 
              id="signup-password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="Create a password"
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <input 
              type="password" 
              id="signup-confirm-password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
              placeholder="Confirm your password"
            />
          </div>
          
          <div className="form-checkbox">
            <input 
              type="checkbox" 
              id="agree-terms" 
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
            />
            <label htmlFor="agree-terms">
              I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          
          <div className="form-footer">
            Already have an account? <a href="#" onClick={handleLoginClick}>Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
