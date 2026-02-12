import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'digit' | 'operator' | 'action' | 'equals';
  className?: string;
}

const getVariantClass = (variant?: string) => {
  switch (variant) {
    case 'operator':
      return "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white";
    case 'equals':
      return "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white";
    case 'digit':
      return "bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white";
    case 'action':
      return "bg-gray-500 hover:bg-gray-400 active:bg-gray-600 text-white";
    default:
      return 'bg-gray-500 hover:bg-gray-400 text-white';
  }
};

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant, 
  className 
}) => {
  
  return (
    <button
      className={`p-4 text-lg font-semibold rounded-lg transition-all duration-200 
                 shadow hover:shadow-md active:shadow-none
                 ${getVariantClass(variant)} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;