import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed = 10, enabled = true) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText(''); // Reset on new text
    if (text && enabled) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(prevText => prevText + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);

      return () => {
        clearInterval(typingInterval);
      };
    } else if (!enabled) {
      setDisplayText(text);
    }
  }, [text, speed, enabled]);

  return displayText;
}
