import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>User Profile</h2>
        <div className="avatar">
          {currentUser?.displayName?.[0]?.toUpperCase()}
        </div>
      </div>
      <div className="profile-details">
        <p><strong>Name:</strong> {currentUser?.displayName || 'Anonymous'}</p>
        <p><strong>Email:</strong> {currentUser?.email}</p>
        <p><strong>Registered:</strong> {new Date(currentUser?.metadata.creationTime).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserProfile;
