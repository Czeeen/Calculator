export interface ButtonConfig {
    id: string;
    label: string;
    type: 'digit' | 'operator' | 'action' | 'equals';
    value: string;
    colSpan?: 1 | 2 | 3;
}
export const memoryButtons: ButtonConfig[] = [
    {
        id: 'mc',
        label: 'MC',
        type: 'action',
        value: 'mc'
    },

    {
        id: 'mr',
        label: 'MR',
        type: 'action',
        value: 'mr'
    },

    {
        id: 'm+',
        label: 'M+',
        type: 'action',
        value: 'm+'
    },

    {
        id: 'm-',
        label: 'M-',
        type: 'action',
        value: 'm-'
    },


    {
        id: 'ms',
        label: 'MS',
        type: 'action',
        value: 'ms'
    }
]
export const keypadButtons: ButtonConfig[] = [

    {
        id: 'clear',
        label: 'C',
        type: 'action',
        value: 'clear'
    },

    {
        id: 'backspace',
        label: '⌫',
        type: 'action',
        value: 'backspace'
    },

    {
        id: 'percent',
        label: '%',
        type: 'operator',
        value: '%'
    },

    {
        id: 'divide',
        label: '/',
        type: 'operator',
        value: '/',
    },

    {
        id: 'digit-7',
        label: '7',
        type: 'digit',
        value: '7',
    },

    {
        id: 'digit-8',
        label: '8',
        type: 'digit',
        value: '8',
    },

    {
        id: 'digit-9',
        label: '9',
        type: 'digit',
        value: '9',
    },

    {
        id: 'multiply',
        label: '×',
        type: 'operator',
        value: '*',
    },

    {
        id: 'digit-4',
        label: '4',
        type: 'digit',
        value: '4',
    },

    {
        id: 'digit-5',
        label: '5',
        type: 'digit',
        value: '5',
    },

    {
        id: 'digit-6',
        label: '6',
        type: 'digit',
        value: '6',
    },

    {
        id: 'subtract',
        label: '-',
        type: 'operator',
        value: '-',
    },

    {
        id: 'digit-1',
        label: '1',
        type: 'digit',
        value: '1',
    },

    {
        id: 'digit-2',
        label: '2',
        type: 'digit',
        value: '2',
    },

    {
        id: 'digit-3',
        label: '3',
        type: 'digit',
        value: '3',
    },

    {
        id: 'add',
        label: '+',
        type: 'operator',
        value: '+',
    },

    {
        id: 'sign',
        label: '±',
        type: 'digit',
        value: 'sign',
    },

    
    {
        id: 'digit-0',
        label: '0',
        type: 'digit',
        value: '0',
    },

    {
        id: 'decimal',
        label: '.',
        type: 'digit',
        value: '.',
    },

    {
        id: 'equals',
        label: '=',
        type: 'equals',
        value: '=',
    }


]