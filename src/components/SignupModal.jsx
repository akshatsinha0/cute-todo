import { useState } from 'react';
import { registerUser } from '../firebase';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/sidebar.css';

const SignupModal = ({ onClose, showLoginModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Register user and get user credential
      const userCredential = await registerUser(email, password, name);
      
      // Send verification email
      const _auth = getAuth();
      await sendEmailVerification(userCredential.user);
      
      // Show success message with verification info
      alert(`Verification email sent to ${email}! Please check your inbox and verify your email address.`);
      
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
      <div className="modal-content aws-style" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Sign up for Priority Pulse</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="signup-name">Full Name</label>
            <p className="field-description">Choose a name for your account. You can change this name in settings later.</p>
            <input 
              type="text" 
              id="signup-name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              placeholder="Enter your full name"
              className="aws-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="signup-email">Email address</label>
            <p className="field-description">Used for account recovery and notifications</p>
            <input 
              type="email" 
              id="signup-email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="Enter your email"
              className="aws-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"}
                id="signup-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                placeholder="Create a password"
                minLength="6"
                className="aws-input"
              />
              <button 
                type="button" 
                className="password-toggle-btn aws-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showConfirmPassword ? "text" : "password"}
                id="signup-confirm-password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
                placeholder="Confirm your password"
                className="aws-input"
              />
              <button 
                type="button" 
                className="password-toggle-btn aws-toggle"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
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
              I agree to the <a href="#terms" className="aws-link">Terms of Service</a> and <a href="#privacy" className="aws-link">Privacy Policy</a>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="aws-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Verify email address & Create Account'}
          </button>
          
          <div className="aws-divider">
            <span>OR</span>
          </div>
          
          <button 
            type="button" 
            className="aws-signin-button"
            onClick={handleLoginClick}
          >
            Sign in to an existing Priority Pulse account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
