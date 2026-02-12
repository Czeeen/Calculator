import { useEffect } from 'react';

const KEY_MAP: Record<string, string> = {
  'Digit0': '0', 'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4',
  'Digit5': '5', 'Digit6': '6', 'Digit7': '7', 'Digit8': '8', 'Digit9': '9',

  'Numpad0': '0', 'Numpad1': '1', 'Numpad2': '2', 'Numpad3': '3', 'Numpad4': '4',
  'Numpad5': '5', 'Numpad6': '6', 'Numpad7': '7', 'Numpad8': '8', 'Numpad9': '9',

  'Period': '.', 'NumpadDecimal': '.',

  'NumpadAdd': '+', 'NumpadSubtract': '-', 'NumpadMultiply': '*', 'NumpadDivide': '/',

  'Backspace': 'backspace',
  'Escape': 'clear',

  'Enter': '=',
  'NumpadEnter': '=',

  'KeyN': 'sign',
  'KeyC': 'mc',
  'KeyR': 'mr',
  'KeyS': 'ms',
};

export const useKeyboardHandler = (onKeyCommand: (command: string) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        return;
      }
        if (event.altKey && event.code === 'Equal') {
        event.preventDefault();
        onKeyCommand('m+');
        return;
      }

      if (event.altKey && event.code === 'Minus') {
        event.preventDefault();
        onKeyCommand('m-');
        return;
      }

      if (event.code === 'Equal' && event.shiftKey) {
        event.preventDefault();
        onKeyCommand('+');
        return;
      }

      if (event.code === 'Digit5' && event.shiftKey) {
        event.preventDefault();
        onKeyCommand('%');
        return;
      }

      if (event.code === 'Digit8' && event.shiftKey) {
        event.preventDefault();
        onKeyCommand('*');
        return;
      }

      if (event.code === 'Equal' && !event.shiftKey) {
        event.preventDefault();
        onKeyCommand('=');
        return;
      }

      if (event.code === 'Minus') {
        event.preventDefault();
        onKeyCommand('-');
        return;
      }

      if (event.code === 'Slash' && !event.shiftKey) {
        event.preventDefault();
        onKeyCommand('/');
        return;
      }

      if (event.ctrlKey && event.code === 'KeyM') {
        event.preventDefault();
        return;
      }

      const command = KEY_MAP[event.code];

      if (command) {
        event.preventDefault();
        onKeyCommand(command);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyCommand]);
};