import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { logoutUser } from '../firebase';
import { 
  FaUser, FaCog, FaBell, FaSignOutAlt, FaChevronDown,
  FaTachometerAlt, FaTasks, FaCalendar, FaChartBar, FaCogs
} from 'react-icons/fa';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import ProfileMenu from './ProfileMenu';
import '../styles/sidebar.css';

const Sidebar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { currentUser } = useAuth();
  const profileMenuRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

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
              <div 
                className="user-profile-header" 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-label="Toggle profile menu"
              >
                <div className="user-avatar-container">
                  <div className="user-avatar">
                    {currentUser.photoURL ? (
                      <img src={currentUser.photoURL} alt="Profile" />
                    ) : (
                      <span>{currentUser.displayName?.[0]?.toUpperCase() || 'U'}</span>
                    )}
                  </div>
                  <div className="user-status-indicator online" title="Online"></div>
                </div>
                
                <div className="user-info">
                  <p className="user-name">{currentUser.displayName || 'User'}</p>
                  <p className="user-email">{currentUser.email}</p>
                </div>
                
                <FaChevronDown className={`dropdown-icon ${showProfileMenu ? 'rotated' : ''}`} />
              </div>
              
              {showProfileMenu && (
                <ProfileMenu 
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  ref={profileMenuRef}
                />
              )}
            </div>
          ) : (
            <nav className="sidebar-nav">
              <ul>
                <li className="nav-item active">
                  <FaTachometerAlt className="nav-icon" />
                  <span>Dashboard</span>
                </li>
                <li className="nav-item">
                  <FaTasks className="nav-icon" />
                  <span>Tasks</span>
                </li>
                <li className="nav-item">
                  <FaCalendar className="nav-icon" />
                  <span>Calendar</span>
                </li>
                <li className="nav-item">
                  <FaChartBar className="nav-icon" />
                  <span>Analytics</span>
                </li>
                <li className="nav-item">
                  <FaCogs className="nav-icon" />
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
