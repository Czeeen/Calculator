import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'digit' | 'operator' | 'action' | 'equals';
  className?: string;
}

// ✅ Маппинг variant в CSS классы (вместо Tailwind)
const getVariantClass = (variant?: string): string => {
  switch (variant) {
    case 'operator':
      return 'btn btn--operator';
    case 'equals':
      return 'btn btn--equals';
    case 'digit':
      return 'btn btn--digit';
    case 'action':
      return 'btn btn--action';
    default:
      return 'btn btn--action';
  }
};

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant, 
  className = '' 
}) => {
  
  return (
    <button
      className={`${getVariantClass(variant)} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;