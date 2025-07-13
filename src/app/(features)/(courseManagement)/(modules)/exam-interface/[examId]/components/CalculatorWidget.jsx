"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Calculator } from "lucide-react";

export default function CalculatorWidget({ onClose }) {
    const [display, setDisplay] = useState("0");
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [isScientific, setIsScientific] = useState(false);

    const inputNumber = (num) => {
        if (waitingForOperand) {
            setDisplay(num);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === "0" ? num : display + num);
        }
    };

    const inputOperation = (nextOperation) => {
        const inputValue = Number.parseFloat(display);

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

    const calculate = (firstValue, secondValue, operation) => {
        switch (operation) {
            case "+":
                return firstValue + secondValue;
            case "-":
                return firstValue - secondValue;
            case "×":
                return firstValue * secondValue;
            case "÷":
                return firstValue / secondValue;
            case "=":
                return secondValue;
            default:
                return secondValue;
        }
    };

    const performCalculation = () => {
        const inputValue = Number.parseFloat(display);

        if (previousValue !== null && operation) {
            const newValue = calculate(previousValue, inputValue, operation);
            setDisplay(String(newValue));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
        }
    };

    const clear = () => {
        setDisplay("0");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    const scientificFunction = (func) => {
        const value = Number.parseFloat(display);
        let result;

        switch (func) {
            case "sin":
                result = Math.sin((value * Math.PI) / 180);
                break;
            case "cos":
                result = Math.cos((value * Math.PI) / 180);
                break;
            case "tan":
                result = Math.tan((value * Math.PI) / 180);
                break;
            case "log":
                result = Math.log10(value);
                break;
            case "ln":
                result = Math.log(value);
                break;
            case "√":
                result = Math.sqrt(value);
                break;
            case "x²":
                result = value * value;
                break;
            case "π":
                result = Math.PI;
                break;
            case "e":
                result = Math.E;
                break;
            default:
                result = value;
        }

        setDisplay(String(result));
        setWaitingForOperand(true);
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Calculator className="w-5 h-5 text-orange-500" />
                            Calculator
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setIsScientific(!isScientific)} className="text-xs">
                                {isScientific ? "Basic" : "Scientific"}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={onClose}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Display */}
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                        <div className="text-right text-2xl font-mono font-bold text-gray-900 dark:text-white overflow-hidden">{display}</div>
                    </div>

                    {/* Scientific Functions */}
                    {isScientific && (
                        <div className="grid grid-cols-5 gap-2">
                            {["sin", "cos", "tan", "log", "ln"].map((func) => (
                                <Button key={func} variant="outline" size="sm" onClick={() => scientificFunction(func)} className="text-xs">
                                    {func}
                                </Button>
                            ))}
                            {["√", "x²", "π", "e", "1/x"].map((func) => (
                                <Button key={func} variant="outline" size="sm" onClick={() => scientificFunction(func)} className="text-xs">
                                    {func}
                                </Button>
                            ))}
                        </div>
                    )}

                    {/* Main Calculator */}
                    <div className="grid grid-cols-4 gap-2">
                        <Button variant="outline" onClick={clear} className="col-span-2 bg-transparent">
                            Clear
                        </Button>
                        <Button variant="outline" onClick={() => inputOperation("÷")}>
                            ÷
                        </Button>
                        <Button variant="outline" onClick={() => inputOperation("×")}>
                            ×
                        </Button>

                        {[7, 8, 9].map((num) => (
                            <Button key={num} variant="outline" onClick={() => inputNumber(String(num))}>
                                {num}
                            </Button>
                        ))}
                        <Button variant="outline" onClick={() => inputOperation("-")}>
                            -
                        </Button>

                        {[4, 5, 6].map((num) => (
                            <Button key={num} variant="outline" onClick={() => inputNumber(String(num))}>
                                {num}
                            </Button>
                        ))}
                        <Button variant="outline" onClick={() => inputOperation("+")} className="row-span-2">
                            +
                        </Button>

                        {[1, 2, 3].map((num) => (
                            <Button key={num} variant="outline" onClick={() => inputNumber(String(num))}>
                                {num}
                            </Button>
                        ))}

                        <Button variant="outline" onClick={() => inputNumber("0")} className="col-span-2">
                            0
                        </Button>
                        <Button variant="outline" onClick={() => inputNumber(".")}>
                            .
                        </Button>
                        <Button onClick={performCalculation} className="bg-orange-500 hover:bg-orange-600 text-white">
                            =
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
