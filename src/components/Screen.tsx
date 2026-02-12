import React from 'react';

interface ScreenProps {
    value: string;
    previousValue: string;
}

export default function Screen({ value, previousValue }: ScreenProps) {    
    return (
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-lg p-4 w-full">
            <div className="text-right text-gray-400 text-sm min-h-[1.5rem] mb-1">
                {previousValue}
            </div>
            <div className="text-right text-white text-4xl font-light break-all w-full">
                {value}
            </div>
        </div>
    )
}