import React, { forwardRef } from 'react';
import { 
  FaUser, FaCog, FaBell, FaSignOutAlt, 
  FaCheckCircle, FaUserPlus 
} from 'react-icons/fa';

const ProfileMenu = forwardRef(({ currentUser, onLogout }, ref) => {
  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (!currentUser) return 0;
    
    let completed = 0;
    const total = 4;
    
    if (currentUser.displayName) completed++;
    if (currentUser.email) completed++;
    if (currentUser.emailVerified) completed++;
    if (currentUser.photoURL) completed++;
    
    return Math.floor((completed / total) * 100);
  };

  // Format registration date
  const formatRegistrationDate = () => {
    if (!currentUser?.metadata?.creationTime) return 'N/A';
    
    const date = new Date(currentUser.metadata.creationTime);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  // Calculate task completion rate
  const taskCompletionRate = () => {
    // Would normally calculate from actual tasks
    return "83%";
  };

  return (
    <div className="profile-dropdown-menu" ref={ref}>
      <div className="profile-completion-section">
        <p>Profile Completion</p>
        <div className="profile-completion-bar">
          <div 
            className="profile-completion-progress" 
            style={{ width: `${calculateProfileCompletion()}%` }}
          ></div>
        </div>
        <p className="completion-percentage">{calculateProfileCompletion()}% Complete</p>
      </div>
      
      <div className="profile-menu-items">
        <a href="#profile" className="profile-menu-item">
          <FaUser className="menu-icon" />
          <span>View Profile</span>
        </a>
        <a href="#settings" className="profile-menu-item">
          <FaCog className="menu-icon" />
          <span>Account Settings</span>
        </a>
        <a href="#notifications" className="profile-menu-item">
          <FaBell className="menu-icon" />
          <span>Notifications</span>
          <span className="notification-badge">3</span>
        </a>
        <button onClick={onLogout} className="profile-menu-item logout-item">
          <FaSignOutAlt className="menu-icon" />
          <span>Log Out</span>
        </button>
      </div>
      
      <div className="profile-info-section">
        <div className="info-grid">
          <div className="info-item">
            <p className="info-label">Account Type</p>
            <p className="info-value">
              <span className="account-badge free">Free Plan</span>
              <a href="#upgrade" className="upgrade-link">
                <FaUserPlus size={12} /> Upgrade
              </a>
            </p>
          </div>
          
          <div className="info-item">
            <p className="info-label">Member Since</p>
            <p className="info-value">{formatRegistrationDate()}</p>
          </div>
          
          <div className="info-item">
            <p className="info-label">Email Status</p>
            <p className="info-value verification-status">
              {currentUser?.emailVerified ? (
                <><FaCheckCircle className="verified-icon" /> Verified</>
              ) : (
                <span className="unverified">Not Verified</span>
              )}
            </p>
          </div>
          
          <div className="info-item">
            <p className="info-label">Task Completion</p>
            <p className="info-value">{taskCompletionRate()}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileMenu;
