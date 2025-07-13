"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function OptionButton({ option, index, isSelected, onSelect }) {
    return (
        <Button
            variant="ghost"
            className={`w-full justify-start text-left h-auto p-4 border-2 transition-all duration-300 ${
                isSelected
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500 shadow-lg transform scale-[1.02]"
                    : "border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/10"
            }`}
            onClick={onSelect}
        >
            <div className="flex items-center gap-3 w-full">
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isSelected ? "bg-white/20 text-white" : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                    }`}
                >
                    {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1 text-sm leading-relaxed">{option}</span>
                {isSelected && <CheckCircle className="w-5 h-5 text-white" />}
            </div>
        </Button>
    );
}
