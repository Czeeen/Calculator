import React from 'react';
import Button from './Button';
import { keypadButtons } from '../config/keypadConfig';

interface KeypadProps {
  onButtonClick: (value: string) => void;
}

const colSpanClasses = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3'
}

const Keypad = ({ onButtonClick }: KeypadProps) => {
  return (
    <div className="grid grid-cols-5 gap-1 p-1">
      {keypadButtons.map(button => (
        <Button
          key={button.id}
          onClick={() => onButtonClick(button.value)}
          variant={button.type}
          className={button.colSpan ? colSpanClasses[button.colSpan] : '' }
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};

export default Keypad;