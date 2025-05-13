import { useState, useEffect } from 'react';

const ShareTaskModal = ({ task, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  
  useEffect(() => {
    if (task) {
      const taskData = {
        text: task.text,
        priority: task.priority,
        dueDate: task.dueDate,
        tags: task.tags,
      };
      
      const encoded = btoa(JSON.stringify(taskData));
      const url = `${window.location.origin}?share=${encoded}`;
      setShareUrl(url);
    }
  }, [task]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => console.error('Could not copy text: ', err)
    );
  };
  
  if (!task) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Share Task</h3>
        <p className="task-text">{task.text}</p>
        
        <div className="share-url-container">
          <input 
            type="text" 
            value={shareUrl} 
            readOnly 
            className="share-url-input"
          />
          <button 
            onClick={copyToClipboard} 
            className={`copy-btn ${copied ? 'copied' : ''}`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        <div className="qr-placeholder">
          <p>QR Code would be generated here with a QR code library</p>
          <div className="fake-qr"></div>
        </div>
        
        <div className="share-options">
          <button className="share-option email">
            <span className="icon">✉️</span>
            Email
          </button>
          <button className="share-option whatsapp">
            <span className="icon">💬</span>
            WhatsApp
          </button>
          <button className="share-option telegram">
            <span className="icon">📤</span>
            Telegram
          </button>
        </div>
        
        <button className="close-modal" onClick={onClose}>
          Close
        </button>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(3px);
        }
        
        .modal-content {
          background: var(--form-gradient);
          border-radius: 12px;
          padding: 25px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          animation: fadeIn 0.3s ease;
        }
        
        h3 {
          margin-bottom: 15px;
          color: #333;
          text-align: center;
        }
        
        .task-text {
          background: rgba(255, 255, 255, 0.8);
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 500;
        }
        
        .share-url-container {
          display: flex;
          margin-bottom: 20px;
        }
        
        .share-url-input {
          flex: 1;
          padding: 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 6px 0 0 6px;
          font-size: 0.9rem;
        }
        
        .copy-btn {
          background: var(--button-gradient);
          color: white;
          border: none;
          padding: 0 15px;
          border-radius: 0 6px 6px 0;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .copy-btn:hover {
          opacity: 0.9;
        }
        
        .copy-btn.copied {
          background: #4caf50;
        }
        
        .qr-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .qr-placeholder p {
          color: #666;
          font-size: 0.85rem;
          margin-bottom: 10px;
          text-align: center;
        }
        
        .fake-qr {
          width: 120px;
          height: 120px;
          background: repeating-linear-gradient(
            45deg,
            #333,
            #333 10px,
            #666 10px,
            #666 20px
          );
          border-radius: 8px;
        }
        
        .share-options {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        
        .share-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.7);
          border: none;
          border-radius: 8px;
          padding: 10px;
          cursor: pointer;
          width: 30%;
          transition: all 0.2s ease;
        }
        
        .share-option:hover {
          transform: translateY(-2px);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }
        
        .icon {
          font-size: 1.5rem;
          margin-bottom: 5px;
        }
        
        .close-modal {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 10px;
          color: #666;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .close-modal:hover {
          background: rgba(0, 0, 0, 0.05);
        }
        
        @media (max-width: 600px) {
          .modal-content {
            padding: 20px;
          }
          
          .share-options {
            flex-direction: column;
            gap: 10px;
          }
          
          .share-option {
            width: 100%;
            flex-direction: row;
            justify-content: center;
            gap: 10px;
          }
          
          .icon {
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ShareTaskModal;
    