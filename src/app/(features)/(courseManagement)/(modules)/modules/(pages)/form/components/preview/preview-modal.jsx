"use client";

import React from "react";
import { useState } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PreviewModal({ isOpen, onClose, deviceType, deviceWidth, children }) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={`p-0 ${isFullscreen ? "max-w-full w-full h-screen m-0 rounded-none" : "max-w-[90vw] w-full"}`}>
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                    <DialogTitle className="flex items-center">
                        {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)} Preview ({deviceWidth}px)
                    </DialogTitle>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                        </Button>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <X className="h-5 w-5" />
                            </Button>
                        </DialogClose>
                    </div>
                </div>

                <div
                    className="overflow-auto p-4 flex justify-center"
                    style={{
                        maxHeight: isFullscreen ? "calc(100vh - 60px)" : "80vh",
                    }}
                >
                    <div
                        className={`bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg ${isFullscreen ? "h-full" : ""}`}
                        style={{ width: `${deviceWidth}px` }}
                    >
                        {children}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
