import Button from './Button';
import MemoryButton from './MemoryButton';
import { keypadButtons, memoryButtons } from '../config/keypadConfig';

interface KeypadProps {
  onButtonClick: (value: string) => void;
  hasMemory: boolean;
}

const Keypad = ({ onButtonClick, hasMemory }: KeypadProps) => {
  return (
    <div className="calculator-keypad">
      <div className="memory-panel">
        {memoryButtons.map(button => (
          <MemoryButton
            key={button.id}
            onClick={() => onButtonClick(button.value)}
            disabled={!hasMemory && (button.id === 'mc' || button.id === 'mr')}
          >
            {button.label}
          </MemoryButton>
        ))}
      </div>

      <div className="main-grid">
        {keypadButtons.map(button => (
          <Button
            key={button.id}
            onClick={() => onButtonClick(button.value)}
            variant={button.type}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Keypad;