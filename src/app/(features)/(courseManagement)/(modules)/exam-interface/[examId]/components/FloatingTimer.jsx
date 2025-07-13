"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Pause, Play, Send, AlertTriangle } from "lucide-react";

export default function FloatingTimer({ timeLeft, sectionTimeLeft, isPaused, onPause, onSubmit }) {
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

    const isWarning = timeLeft < 600; // Less than 10 minutes
    const isCritical = timeLeft < 300; // Less than 5 minutes

    return (
        <div className="fixed top-20 right-4 z-50">
            <Card
                className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl border-0 transition-all duration-300 ${
                    isCritical ? "animate-pulse shadow-red-500/20" : isWarning ? "shadow-yellow-500/20" : "shadow-blue-500/20"
                }`}
            >
                <CardContent className="p-4">
                    <div className="space-y-3">
                        {/* Main Timer */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Clock className={`w-4 h-4 ${getTimeColor(timeLeft)}`} />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Total Time</span>
                                {isCritical && <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />}
                            </div>
                            <div className={`text-2xl font-mono font-bold ${getTimeColor(timeLeft)}`}>{formatTime(timeLeft)}</div>
                        </div>

                        {/* Section Timer */}
                        <div className="text-center border-t pt-3">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Clock className="w-3 h-3 text-blue-500" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Section Time</span>
                            </div>
                            <div className="text-lg font-mono font-semibold text-blue-600">{formatTime(sectionTimeLeft)}</div>
                        </div>

                        {/* Controls */}
                        <div className="flex gap-2 pt-2 border-t">
                            <Button variant="outline" size="sm" onClick={onPause} className="flex-1 flex items-center gap-1 bg-transparent" disabled={timeLeft <= 0}>
                                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                                {isPaused ? "Resume" : "Pause"}
                            </Button>
                            <Button size="sm" onClick={onSubmit} className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center gap-1">
                                <Send className="w-3 h-3" />
                                Submit
                            </Button>
                        </div>

                        {/* Warning Messages */}
                        {isCritical && <div className="text-center text-xs text-red-600 dark:text-red-400 font-medium">⚠️ Less than 5 minutes left!</div>}
                        {isWarning && !isCritical && <div className="text-center text-xs text-yellow-600 dark:text-yellow-400 font-medium">⏰ 10 minutes remaining</div>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
