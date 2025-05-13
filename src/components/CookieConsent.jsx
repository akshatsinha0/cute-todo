import { useState, useEffect } from 'react';
import '../index.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleAcceptAll = () => {
    setCookiePreferences({ necessary: true, analytics: true, marketing: true });
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true, analytics: true, marketing: true,
      timestamp: new Date().toISOString()
    }));
    handleClose();
  };

  const handleRejectAll = () => {
    setCookiePreferences({ necessary: true, analytics: false, marketing: false });
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true, analytics: false, marketing: false,
      timestamp: new Date().toISOString()
    }));
    handleClose();
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      ...cookiePreferences,
      timestamp: new Date().toISOString()
    }));
    handleClose();
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setCookiePreferences(prev => ({ ...prev, [name]: checked }));
  };

  if (!isVisible) return null;

  return (
    <div className={`cookie-consent-container ${isClosing ? 'closing' : ''}`}>
      <div className="cookie-consent">
        <div className="cookie-header">
          <h2>Privacy Preferences</h2>
          <p>We use cookies to enhance your experience, personalize content, and analyze traffic.</p>
        </div>

        <div className="cookie-options">
          {['necessary', 'analytics', 'marketing'].map((type) => (
            <div key={type} className="cookie-option">
              <div className="custom-checkbox">
                <input
                  type="checkbox"
                  id={type}
                  name={type}
                  checked={cookiePreferences[type]}
                  onChange={handlePreferenceChange}
                  disabled={type === 'necessary'}
                />
                <span className="checkmark"></span>
              </div>
              <label htmlFor={type}>
                <strong>{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
                <p>
                  {type === 'necessary' 
                    ? 'Essential for website functionality'
                    : type === 'analytics'
                    ? 'Helps us improve user experience'
                    : 'Enables personalized advertising'}
                </p>
              </label>
            </div>
          ))}
        </div>

        <div className="cookie-actions">
          <button className="btn-primary" onClick={handleAcceptAll}>
            Accept All
          </button>
          <button className="btn-outline" onClick={handleSavePreferences}>
            Save Preferences
          </button>
          <button className="btn-danger" onClick={handleRejectAll}>
            Reject Non-Essential
          </button>
        </div>
      </div>

      <style jsx>{`
        .cookie-consent-container {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          padding: 20px;
          animation: slideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .cookie-consent-container.closing {
          animation: slideDown 0.3s ease forwards;
        }

        .cookie-consent {
          background: var(--cookie-gradient);
          color: #fff;
          border-radius: 16px;
          padding: 25px;
          max-width: 800px;
          margin: 0 auto;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          position: relative;
          overflow: hidden;
        }

        .cookie-consent::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%);
          pointer-events: none;
        }

        .cookie-header {
          margin-bottom: 25px;
          text-align: center;
        }

        .cookie-header h2 {
          font-size: 1.8rem;
          margin-bottom: 10px;
          background: linear-gradient(to right, #fff, #eee);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .cookie-header p {
          font-size: 0.95rem;
          opacity: 0.9;
          line-height: 1.5;
        }

        .cookie-options {
          margin: 25px 0;
        }

        .cookie-option {
          display: flex;
          align-items: flex-start;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .cookie-option:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .custom-checkbox {
          position: relative;
          margin-right: 15px;
          margin-top: 3px;
        }

        .custom-checkbox input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          position: relative;
          display: block;
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .custom-checkbox input:checked ~ .checkmark {
          background: #6a11cb;
          border-color: #6a11cb;
        }

        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .custom-checkbox input:checked ~ .checkmark:after {
          display: block;
        }

        .cookie-option label {
          flex: 1;
          cursor: pointer;
        }

        .cookie-option strong {
          display: block;
          font-size: 1rem;
          margin-bottom: 5px;
        }

        .cookie-option p {
          font-size: 0.85rem;
          opacity: 0.8;
          line-height: 1.4;
        }

        .cookie-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .cookie-actions button {
          flex: 1;
          max-width: 200px;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .cookie-actions button:hover {
          transform: translateY(-2px);
        }

        .btn-primary {
          background: linear-gradient(45deg, #6a11cb, #2575fc);
          box-shadow: 0 4px 15px rgba(106, 17, 203, 0.3);
        }

        .btn-outline {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: rgba(255, 255, 255, 0.9);
        }

        .btn-danger {
          background: linear-gradient(45deg, #ff5e62, #ff9966);
          box-shadow: 0 4px 15px rgba(255, 94, 98, 0.3);
        }

        @media (max-width: 768px) {
          .cookie-consent {
            padding: 20px;
          }

          .cookie-actions {
            flex-direction: column;
          }

          .cookie-actions button {
            max-width: none;
            width: 100%;
          }
        }

        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0 }
          to { transform: translateY(0); opacity: 1 }
        }

        @keyframes slideDown {
          from { transform: translateY(0); opacity: 1 }
          to { transform: translateY(100%); opacity: 0 }
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;
