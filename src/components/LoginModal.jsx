import { useState } from 'react';
import { loginUser } from '../firebase';
import { FaEye, FaEyeSlash, FaGithub, FaLock } from 'react-icons/fa';
import '../styles/sidebar.css';

const LoginModal = ({ onClose, showSignupModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content dark-theme" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Welcome back</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <p className="modal-subtitle">Sign in to your account</p>
        
        {error && <div className="error-message">{error}</div>}

        <div className="social-logins">
          <button className="social-btn github-btn">
            <FaGithub className="btn-icon" />
            Continue with GitHub
          </button>
          <button className="social-btn sso-btn">
            <FaLock className="btn-icon" />
            Continue with SSO
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="dark-input"
            />
          </div>

          <div className="form-group password-group">
            <div className="password-header">
              <label htmlFor="login-password">Password</label>
              <a href="#forgot" className="forgot-password">Forgot Password?</a>
            </div>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Put your password"
                className="dark-input"
              />
              <button 
                type="button" 
                className="password-toggle-btn" 
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-submit dark-btn"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="form-footer">
            Don't have an account? <a href="#signup" onClick={handleSignupClick}>Sign Up Now</a>
          </div>
          
          <div className="terms-text">
            By continuing, you agree to PriorityPulse's <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
