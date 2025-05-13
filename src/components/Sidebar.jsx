import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { logoutUser } from '../firebase';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import '../styles/sidebar.css';

const Sidebar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h2>PriorityPulse</h2>
          </div>

          {currentUser ? (
            <div className="user-profile-sidebar">
              <div className="user-avatar">
                {currentUser.displayName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="user-info">
                <p className="user-name">{currentUser.displayName || 'User'}</p>
                <p className="user-email">{currentUser.email}</p>
              </div>
            </div>
          ) : (
            <nav className="sidebar-nav">
              <ul>
                <li className="nav-item active">
                  <span>Dashboard</span>
                </li>
                <li className="nav-item">
                  <span>Tasks</span>
                </li>
                <li className="nav-item">
                  <span>Calendar</span>
                </li>
                <li className="nav-item">
                  <span>Analytics</span>
                </li>
                <li className="nav-item">
                  <span>Settings</span>
                </li>
              </ul>
            </nav>
          )}

          <div className="sidebar-footer">
            {!currentUser ? (
              <>
                <button 
                  className="login-btn"
                  onClick={() => setShowLoginModal(true)}
                >
                  Log In
                </button>
                <button 
                  className="signup-btn"
                  onClick={() => setShowSignupModal(true)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button 
                className="logout-btn"
                onClick={handleLogout}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          showSignupModal={() => setShowSignupModal(true)}
        />
      )}

      {showSignupModal && (
        <SignupModal 
          onClose={() => setShowSignupModal(false)}
          showLoginModal={() => setShowLoginModal(true)}
        />
      )}
    </>
  );
};

export default Sidebar;
