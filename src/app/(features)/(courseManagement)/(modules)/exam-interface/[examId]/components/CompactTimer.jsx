"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Pause, Play, Send, AlertTriangle } from "lucide-react";

export default function CompactTimer({ timeLeft, isPaused, onPause, onSubmit }) {
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        }
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    const getTimeColor = (time) => {
        if (time < 300) return "text-red-500"; // Less than 5 minutes
        if (time < 900) return "text-yellow-500"; // Less than 15 minutes
        return "text-green-500";
    };

    const isCritical = timeLeft < 300; // Less than 5 minutes
    const isWarning = timeLeft < 900; // Less than 15 minutes

    return (
        <div className="">
            <div
                className={`
                `}
            >
                <div className="">
                    <div className="flex items-center gap-3">
                        {/* Timer Display */}
                        <div className="text-center flex gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className={`w-4 h-4 ${getTimeColor(timeLeft)}`} />
                                {isCritical && <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />}
                            </div>
                            <div className={`text-xl font-mono font-bold ${getTimeColor(timeLeft)}`}>{formatTime(timeLeft)}</div>
                            {isCritical && <div className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">Time Critical!</div>}
                        </div>

                        {/* Controls */}
                        {/* <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm" onClick={onPause} className="flex items-center gap-1 bg-transparent rounded-lg" disabled={timeLeft <= 0}>
                                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                            </Button>
                            <Button size="sm" onClick={onSubmit} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 rounded-lg">
                                <Send className="w-3 h-3" />
                            </Button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
