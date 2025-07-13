"use client";

import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";

export default function Timer({ initialTime, onTimeUp, className = "" }) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        }
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    const getTimeColor = () => {
        if (timeLeft < 300) return "text-red-500"; // Less than 5 minutes
        if (timeLeft < 900) return "text-yellow-500"; // Less than 15 minutes
        return "text-green-500";
    };

    const isWarning = timeLeft < 300;

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {isWarning && <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />}
            <Clock className={`w-5 h-5 ${getTimeColor()}`} />
            <span className={`font-mono font-bold text-lg ${getTimeColor()}`}>{formatTime(timeLeft)}</span>
        </div>
    );
}
