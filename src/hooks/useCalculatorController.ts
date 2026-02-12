import { useState, useCallback,useEffect } from 'react';
import { TCalculatorModel } from '../core/TCalculatorModel';
import { useKeyboardHandler } from './useKeyboardInput';

export interface CalculatorController {
  displayValue: string;
  previousValue: string;
  hasMemory: boolean;
  handleButtonClick: (value: string) => void;
}

export const useCalculatorController = (): CalculatorController => {
  // тут постоянно создается новая модель
  // const model = new TCalculatorModel();  

  // тут мы создаем модель только при инициализации
  const [model] = useState(() => new TCalculatorModel());


  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [hasMemory, setHasMemory] = useState(false);

  const updateDisplay = useCallback(() => {
    setDisplayValue(model.getDisplayValue());
  }, [model]);

  useEffect(() => {
    setHasMemory(model.getMemoryValue() !== 0);
  }, [model, displayValue]);

  const handleButtonClick = useCallback((value: string) => {
    if (value >= '0' && value <= '9') {
      model.inputDigit(value);
      updateDisplay();
      return;
    }

    if (value === '.') {
      model.inputDot();
      updateDisplay();
      return;
    }

    if (value === 'mc') {
      model.memoryClear();
      setHasMemory(false);
      updateDisplay();
      return;
    }

    if (value === 'ms') {
      model.memoryStore();
      setHasMemory(model.getMemoryValue() !== 0);
      updateDisplay();
      return;
    }

    if (value === 'mr') {
      model.memoryRecall();
      updateDisplay();
      return;
    }

    if (value === 'm+') {
      model.memoryAdd();
      setHasMemory(model.getMemoryValue() !== 0);
      updateDisplay();
      return;
    }

    if (value === 'm-') {
      model.memorySubtract();
      setHasMemory(model.getMemoryValue() !== 0);
      updateDisplay();
      return;
    }

    if (value === 'sign') {
      model.toggleSign();
      updateDisplay();
      return;
    }

    if (value === 'backspace') {
      model.backspace();
      updateDisplay();
      return;
    }

    if (value === '%') {
      model.inputPercent();
      updateDisplay();
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      setPreviousValue(model.getDisplayValue() + ' ' + value);
      model.setOperator(value);
      updateDisplay();
      return;
    }

    if (value === 'clear') {
      model.clearAll();
      setPreviousValue('');
      updateDisplay();
      return;
    }

    if (value === 'clearEntry') {
      model.clearEntry();
      updateDisplay();
      return;
    }

    if (value === '=') {
      model.calculateResult();
      setPreviousValue('');
      updateDisplay();
      return;
    }
  }, [model, updateDisplay]);

  useKeyboardHandler(handleButtonClick);

  return {
    displayValue,
    previousValue,
    hasMemory,
    handleButtonClick

  };
};