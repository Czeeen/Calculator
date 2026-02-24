interface ScreenProps {
    value: string;
    previousValue: string;
    hasMemory: boolean;
}

export default function Screen({ value, previousValue, hasMemory }: ScreenProps) {    
    return (
        <div className="calculator-screen">
            <div className="screen-previous-value">
                {previousValue}
            </div>
            <div className="screen-current-value">
                {value}
            </div>
        </div>
    )
}