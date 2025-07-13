"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Camera, Monitor, Eye, AlertTriangle, CheckCircle, XCircle, X } from "lucide-react";

export default function ProctoringSidebar({ violations, tabSwitchCount, maxTabSwitches, faceDetected, screenRecording, webcamActive }) {
    const [isOpen, setIsOpen] = useState(false);

    const getStatusIcon = (status) => {
        return status ? <CheckCircle className="w-3 h-3 text-green-500" /> : <XCircle className="w-3 h-3 text-red-500" />;
    };

    const getTabSwitchColor = () => {
        const percentage = (tabSwitchCount / maxTabSwitches) * 100;
        if (percentage >= 80) return "text-red-500";
        if (percentage >= 60) return "text-yellow-500";
        return "text-green-500";
    };

    const getSecurityStatus = () => {
        if (violations.length === 0 && faceDetected && webcamActive && screenRecording) {
            return { status: "Secure", color: "bg-green-500" };
        } else if (violations.length < 3) {
            return { status: "Moderate", color: "bg-yellow-500" };
        } else {
            return { status: "High Risk", color: "bg-red-500" };
        }
    };

    // Toggle button (always visible)
    const toggleButton = (
        <Button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-orange-400 hover:bg-orange-500 text-white shadow-lg transition-all duration-300 hover:scale-110"
            size="sm"
        >
            <Shield className="w-5 h-5" />
        </Button>
    );

    // Expanded sidebar
    if (isOpen) {
        return (
            <>
                {toggleButton}
                <div className="fixed bottom-20 right-4 z-40 w-72 sm:w-80">
                    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-xl border-0 rounded-xl">
                        <CardHeader className="pb-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-orange-400" />
                                    Proctoring Status
                                </CardTitle>
                                <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 space-y-3">
                            {/* System Status */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Camera className="w-3 h-3 text-blue-500" />
                                        <span className="text-xs">Webcam</span>
                                    </div>
                                    {getStatusIcon(webcamActive)}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Monitor className="w-3 h-3 text-green-500" />
                                        <span className="text-xs">Screen Recording</span>
                                    </div>
                                    {getStatusIcon(screenRecording)}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Eye className="w-3 h-3 text-purple-500" />
                                        <span className="text-xs">Face Detection</span>
                                    </div>
                                    {getStatusIcon(faceDetected)}
                                </div>
                            </div>

                            {/* Tab Switch Counter */}
                            <div className="border-t pt-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium">Tab Switches</span>
                                    <Badge variant={tabSwitchCount >= maxTabSwitches ? "destructive" : "secondary"} className="text-xs">
                                        <span className={getTabSwitchColor()}>
                                            {tabSwitchCount}/{maxTabSwitches}
                                        </span>
                                    </Badge>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                    <div
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            tabSwitchCount >= maxTabSwitches ? "bg-red-500" : tabSwitchCount >= maxTabSwitches * 0.8 ? "bg-yellow-500" : "bg-green-500"
                                        }`}
                                        style={{ width: `${Math.min((tabSwitchCount / maxTabSwitches) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Violations Log */}
                            <div className="border-t pt-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-3 h-3 text-yellow-500" />
                                    <span className="text-xs font-medium">Violations ({violations.length})</span>
                                </div>

                                {violations.length === 0 ? (
                                    <div className="text-xs text-green-600 dark:text-green-400 text-center py-2">No violations detected</div>
                                ) : (
                                    <div className="max-h-24 overflow-y-auto space-y-1">
                                        {violations.slice(-3).map((violation, index) => (
                                            <div key={index} className="text-xs p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md">
                                                {violation}
                                            </div>
                                        ))}
                                        {violations.length > 3 && <div className="text-xs text-gray-500 text-center">+{violations.length - 3} more violations</div>}
                                    </div>
                                )}
                            </div>

                            {/* Security Level */}
                            <div className="border-t pt-3">
                                <div className="text-center">
                                    <div className="text-xs text-gray-500 mb-1">Security Level</div>
                                    <Badge
                                        className={`text-xs ${
                                            getSecurityStatus().status === "Secure"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                                : getSecurityStatus().status === "Moderate"
                                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                        }`}
                                    >
                                        {getSecurityStatus().status}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    }

    // Just the toggle button when closed
    return toggleButton;
}
