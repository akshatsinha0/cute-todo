import { useState, useEffect } from 'react';

const TypewriterHeading = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);
  
  const fullText = 'PriorityPulse';
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 2000;

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && text === fullText) {
        setTimeout(() => {
          setIsDeleting(true);
          setSpeed(deletingSpeed);
        }, pauseDuration);
        return;
      }
      
      if (isDeleting && text === '') {
        setIsDeleting(false);
        setSpeed(typingSpeed);
        return;
      }

      setText(current => 
        isDeleting 
          ? current.slice(0, -1) 
          : fullText.slice(0, current.length + 1)
      );
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, speed]);

  return (
    <h1 className="welcome-heading">
      Welcome to{' '}
      <span className="typewriter-container">
        <span className="typewriter-text">{text}</span>
        <span className="typewriter-cursor">|</span>
      </span>
    </h1>
  );
};

export default TypewriterHeading;
