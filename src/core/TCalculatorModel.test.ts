import { TCalculatorModel } from './TCalculatorModel';

function runTests() {
  const tests: Array<{ name: string; fn: () => void }> = [];
  let passed = 0;
  let failed = 0;

  function test(name: string, fn: () => void) {
    tests.push({ name, fn });
  }

  function assertEqual(actual: any, expected: any, message?: string) {
    if (actual !== expected) {
      throw new Error(
        `Assertion failed: ${message || ''}\n  Expected: ${expected}\n  Received: ${actual}`
      );
    }
  }

  test('initial state should be "0"', () => {
    const model = new TCalculatorModel();
    assertEqual(model.getDisplayValue(), '0');
  });

  test('inputDigit should accumulate numbers', () => {
    const model = new TCalculatorModel();
    model.inputDigit('1');
    model.inputDigit('2');
    model.inputDigit('3');
    assertEqual(model.getDisplayValue(), '123');
  });

  test('inputDigit should prevent leading zeros', () => {
    const model = new TCalculatorModel();
    model.inputDigit('0');
    model.inputDigit('0');
    model.inputDigit('0');
    assertEqual(model.getDisplayValue(), '0');
  });

  test('inputDot should add decimal point', () => {
    const model = new TCalculatorModel();
    model.inputDigit('1');
    model.inputDot();
    model.inputDigit('5');
    assertEqual(model.getDisplayValue(), '1.5');
  });

  test('inputDot should prevent multiple dots', () => {
    const model = new TCalculatorModel();
    model.inputDigit('1');
    model.inputDot();
    model.inputDot();
    model.inputDigit('5');
    assertEqual(model.getDisplayValue(), '1.5');
  });

  test('inputDot after reset should show 0.', () => {
    const model = new TCalculatorModel();
    model.inputDigit('5');
    model.setOperator('+');
    model.inputDot();
    assertEqual(model.getDisplayValue(), '0.');
  });

  test('addition: 2 + 3 = 5', () => {
    const model = new TCalculatorModel();
    model.inputDigit('2');
    model.setOperator('+');
    model.inputDigit('3');
    model.calculateResult();
    assertEqual(model.getDisplayValue(), '5');
  });

  test('subtraction: 5 - 3 = 2', () => {
    const model = new TCalculatorModel();
    model.inputDigit('5');
    model.setOperator('-');
    model.inputDigit('3');
    model.calculateResult();
    assertEqual(model.getDisplayValue(), '2');
  });

  test('multiplication: 4 * 3 = 12', () => {
    const model = new TCalculatorModel();
    model.inputDigit('4');
    model.setOperator('*');
    model.inputDigit('3');
    model.calculateResult();
    assertEqual(model.getDisplayValue(), '12');
  });

  test('division: 10 / 2 = 5', () => {
    const model = new TCalculatorModel();
    model.inputDigit('1');
    model.inputDigit('0');
    model.setOperator('/');
    model.inputDigit('2');
    model.calculateResult();
    assertEqual(model.getDisplayValue(), '5');
  });

  test('division by zero should show "Error"', () => {
    const model = new TCalculatorModel();
    model.inputDigit('5');
    model.setOperator('/');
    model.inputDigit('0');
    model.calculateResult();
    assertEqual(model.getDisplayValue(), 'Error');
  });

  test('floating point: 0.1 + 0.2 = 0.3', () => {
    const model = new TCalculatorModel();
    model.inputDigit('0');
    model.inputDot();
    model.inputDigit('1');
    model.setOperator('+');
    model.inputDigit('0');
    model.inputDot();
    model.inputDigit('2');
    model.calculateResult();
    assertEqual(model.getDisplayValue(), '0.3');
  });

  test('chain operations: 1 + 2 + 3 = 6', () => {
    const model = new TCalculatorModel();
    model.inputDigit('1');
    model.setOperator('+');
    model.inputDigit('2');
    model.setOperator('+');
    model.inputDigit('3');
    model.calculateResult();
    assertEqual(model.getDisplayValue(), '6');
  });

  test('clearEntry should reset current value only', () => {
    const model = new TCalculatorModel();
    model.inputDigit('5');
    model.setOperator('+');
    model.inputDigit('1');
    model.inputDigit('2');
    model.inputDigit('3');
    model.clearEntry();
    assertEqual(model.getDisplayValue(), '0');
    model.inputDigit('7');
    model.calculateResult();
    assertEqual(model.getDisplayValue(), '12');
  });

  test('clearAll should reset everything', () => {
    const model = new TCalculatorModel();
    model.inputDigit('5');
    model.setOperator('+');
    model.inputDigit('3');
    model.clearAll();
    assertEqual(model.getDisplayValue(), '0');
    model.inputDigit('2');
    model.setOperator('+');
    model.inputDigit('2');
    model.calculateResult();
    assertEqual(model.getDisplayValue(), '4');
  });

  test('shouldResetDisplay after equals', () => {
    const model = new TCalculatorModel();
    model.inputDigit('2');
    model.setOperator('+');
    model.inputDigit('2');
    model.calculateResult();
    model.inputDigit('5');
    assertEqual(model.getDisplayValue(), '5');
  });

  test('error state should reset on operator', () => {
    const model = new TCalculatorModel();
    model.inputDigit('5');
    model.setOperator('/');
    model.inputDigit('0');
    model.calculateResult();
    assertEqual(model.getDisplayValue(), 'Error');
    model.setOperator('+');
    assertEqual(model.getDisplayValue(), '0');
  });

  console.log('\nRunning TCalculatorModel tests...\n');
  
  for (const { name, fn } of tests) {
    try {
      fn();
      passed++;
      console.log(`PASS ${name}`);
    } catch (error: any) {
      failed++;
      console.log(`FAIL ${name}`);
      console.log(`   ${error.message}\n`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Results: ${passed} passed, ${failed} failed out of ${tests.length} tests`);
  
  if (failed === 0) {
    console.log('All tests passed successfully!\n');
  } else {
    console.log('Some tests failed\n');
  }
}

runTests();