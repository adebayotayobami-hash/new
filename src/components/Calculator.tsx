import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performEquals = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const formatDisplay = (value: string) => {
    // Limit display to fit nicely
    if (value.length > 12) {
      const num = parseFloat(value);
      if (num > 999999999999) {
        return num.toExponential(6);
      }
      return num.toPrecision(12);
    }
    return value;
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-card rounded-2xl shadow-2xl p-6 space-y-4">
      {/* Display */}
      <div className="bg-calc-display rounded-xl p-6 text-right">
        <div className="text-4xl font-light text-calc-display-text min-h-[3rem] flex items-center justify-end">
          {formatDisplay(display)}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-xl font-medium bg-calc-clear hover:bg-calc-clear-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={clear}
        >
          AC
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-xl font-medium bg-calc-clear hover:bg-calc-clear-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => setDisplay(display.slice(0, -1) || '0')}
        >
          ⌫
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-xl font-medium bg-calc-clear hover:bg-calc-clear-hover text-white rounded-xl transition-all duration-150 active:scale-95"
        >
          ±
        </Button>
        <Button
          variant="default"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-operator hover:bg-calc-operator-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => performOperation('÷')}
        >
          ÷
        </Button>

        {/* Row 2 */}
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-number hover:bg-calc-number-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => inputNumber('7')}
        >
          7
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-number hover:bg-calc-number-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => inputNumber('8')}
        >
          8
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-number hover:bg-calc-number-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => inputNumber('9')}
        >
          9
        </Button>
        <Button
          variant="default"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-operator hover:bg-calc-operator-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => performOperation('×')}
        >
          ×
        </Button>

        {/* Row 3 */}
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-number hover:bg-calc-number-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => inputNumber('4')}
        >
          4
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-number hover:bg-calc-number-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => inputNumber('5')}
        >
          5
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-number hover:bg-calc-number-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => inputNumber('6')}
        >
          6
        </Button>
        <Button
          variant="default"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-operator hover:bg-calc-operator-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => performOperation('-')}
        >
          −
        </Button>

        {/* Row 4 */}
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-number hover:bg-calc-number-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => inputNumber('1')}
        >
          1
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-number hover:bg-calc-number-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => inputNumber('2')}
        >
          2
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-number hover:bg-calc-number-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => inputNumber('3')}
        >
          3
        </Button>
        <Button
          variant="default"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-operator hover:bg-calc-operator-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={() => performOperation('+')}
        >
          +
        </Button>

        {/* Row 5 */}
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-number hover:bg-calc-number-hover text-white rounded-xl col-span-2 transition-all duration-150 active:scale-95"
          onClick={() => inputNumber('0')}
        >
          0
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-number hover:bg-calc-number-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={inputDecimal}
        >
          .
        </Button>
        <Button
          variant="default"
          size="lg"
          className="h-16 text-2xl font-medium bg-calc-equals hover:bg-calc-equals-hover text-white rounded-xl transition-all duration-150 active:scale-95"
          onClick={performEquals}
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default Calculator;