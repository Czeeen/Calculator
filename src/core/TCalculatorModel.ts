export class TCalculatorModel {
    private currentValue: string;
    private previousValue: string | null;
    private operator: string | null;
    private shouldResetDisplay: boolean;
    private memoryValue: number;

    constructor() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operator = null;
        this.shouldResetDisplay = false;
        this.memoryValue = 0;
    }

    inputDigit(digit: string): void {

        if (this.shouldResetDisplay) {
            this.currentValue = '0';
            this.shouldResetDisplay = false;
        }

        if (this.currentValue === '0' && digit === '0') {
            return;
        }

        if (this.currentValue === '0') {
            this.currentValue = digit;
        } else {
            this.currentValue += digit;
        }

        if (this.currentValue.length > 15) {
            this.currentValue = this.currentValue.slice(0, 15);
        }
    }

    inputDot(): void {

        if (this.shouldResetDisplay || this.currentValue === 'Error') {
            this.currentValue = '0';
            this.shouldResetDisplay = false;
        }

        if (this.currentValue.includes('.')) {
            return;
        }

        this.currentValue += '.';

        if (this.currentValue.length > 15) {
            this.currentValue = this.currentValue.slice(0, 15);
        }
    }

    clearEntry(): void {
        this.currentValue = '0';
        this.shouldResetDisplay = false;
    }

    compute(a: number, b: number, operator: string): number | null {
        let result: number;
        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                if (b === 0) {
                    return null;
                } else {
                    result = a / b;
                }
                break;
            default:
                return null;
        }

        result = Math.round(result * 1e10) / 1e10;
        return result;
    }

    setOperator(operator: string): void {
        if (this.previousValue != null && operator != null) {
            this.calculateResult();
        }
        this.previousValue = this.currentValue;
        this.operator = operator;
        this.shouldResetDisplay = true;

        if (this.currentValue === 'Error') {
            this.currentValue = '0';
        }
    }

    calculateResult(): void {

        if (this.previousValue === null || this.operator === null) {
            return;
        }

        let a: number = parseFloat(this.previousValue);
        let b: number = parseFloat(this.currentValue);
        const result: number | null = this.compute(a, b, this.operator)

        if (result === null) {
            this.currentValue = 'Error';
        } else {
            this.currentValue = result.toString();
        }

        this.previousValue = null;
        this.operator = null;
        this.shouldResetDisplay = true;
    }

    clearAll(): void {
        this.currentValue = '0';
        this.previousValue = null;
        this.operator = null;
        this.shouldResetDisplay = false;
    }

    public getDisplayValue(): string {
        return this.currentValue;
    }

    backspace(): void {
        if (this.shouldResetDisplay) {
            this.currentValue = '0';
            this.shouldResetDisplay = false;
            return;
        }
        if (['0', 'Error'].includes(this.currentValue)) {
            return;
        }
        this.currentValue = this.currentValue.slice(0, -1);
        if (['', '.', '-'].includes(this.currentValue)) {
            this.currentValue = '0';

        }
    }

    inputPercent(): void {
        if (this.currentValue === 'Error') {
            return;
        }

        if (this.previousValue !== null && this.operator !== null) {
            const originalNumber = parseFloat(this.previousValue);
            const percent = parseFloat(this.currentValue);

            let result: number | null;

            if (this.operator === '+' || this.operator === '-') {
                const percentageValue = (originalNumber * percent) / 100;
                result = this.compute(originalNumber, percentageValue, this.operator);
            } else if (this.operator === '*' || this.operator === '/') {
                const decimalPercent = percent / 100;
                result = this.compute(originalNumber, decimalPercent, this.operator);
            } else {
                result = null;
            }

            if (result === null) {
                this.currentValue = 'Error';
            } else {
                this.currentValue = result.toString();
            }

            this.previousValue = null;
            this.operator = null;
            this.shouldResetDisplay = true;
        } else {
            const value = parseFloat(this.currentValue);
            const result = value / 100;
            const rounded = Math.round(result * 1e10) / 1e10;
            this.currentValue = rounded.toString();
            this.shouldResetDisplay = true;
        }


    }

    toggleSign(): void {
        if (this.currentValue === 'Error') {
            this.currentValue = '0';
            this.shouldResetDisplay = false;
            return;
        }

        if (this.shouldResetDisplay) {
            this.currentValue = '0';
            this.shouldResetDisplay = false;
        }

        if (this.currentValue === '0') {
            return;
        }

        if (this.currentValue.startsWith('-')) {
            this.currentValue = this.currentValue.slice(1);
        }
        else {
            this.currentValue = '-' + this.currentValue;

            if (this.currentValue.length > 15) {
                this.currentValue = this.currentValue.slice(0, 15);
            }
        }
    }

    memoryClear(): void {
        this.memoryValue = 0;
    }

    memoryStore(): void {
        if (this.currentValue === 'Error') {
            return;
        }
        this.memoryValue = parseFloat(this.currentValue);
    }

    memoryRecall(): void {
        this.currentValue = this.memoryValue.toString();
        this.shouldResetDisplay = false;
    }

    memoryAdd(): void {
        if (this.currentValue === 'Error') {
            return;
        }
        const value = this.memoryValue + parseFloat(this.currentValue);
        this.memoryValue = Math.round(value * 1e10) / 1e10
    }
    memorySubtract(): void {
        if (this.currentValue === 'Error') {
            return;
        }
        const value = this.memoryValue - parseFloat(this.currentValue);
        this.memoryValue = Math.round(value * 1e10) / 1e10
    }

    getMemoryValue(): number{
        return this.memoryValue;
    }

    hasMemory(): boolean{
        if(this.memoryValue !== 0){
            return true;
        }
        return false;
    }

}