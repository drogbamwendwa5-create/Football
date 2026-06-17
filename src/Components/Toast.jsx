import React, { useEffect, useState } from 'react';
import './Toast.css';

/**
 * Simple toast notification that auto‑dismisses after a timeout.
 * Props:
 *  - message: text to display
 *  - type: 'info' | 'success' | 'error' | 'warning' (default 'info')
 *  - duration: milliseconds before auto‑close (default 3000)
 *  - onClose: callback when toast is dismissed
 */
export default function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return visible ? (
    <div className={`toast toast-${type}`}>{message}</div>
  ) : null;
}
