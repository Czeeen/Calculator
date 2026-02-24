import React from 'react';

interface MemoryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const MemoryButton: React.FC<MemoryButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false
}) => {
  return (
    <button
      className={`memory-btn ${className} ${disabled ? 'memory-btn-disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MemoryButton;