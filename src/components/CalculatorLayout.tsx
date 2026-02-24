import Screen from "./Screen";
import Keypad from "./Keypad";
import './Calculator.css';
import { useCalculatorController } from "../hooks/useCalculatorController";

const CalculatorLayout = () => {
  const controller = useCalculatorController();
  
  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800 w-64">
      <Screen 
        value={controller.displayValue} 
        previousValue={controller.previousValue} 
        hasMemory={controller.hasMemory}
      />
      <Keypad onButtonClick={controller.handleButtonClick} 
       hasMemory={controller.hasMemory}
       />
    </div>
  );
};

export default CalculatorLayout;