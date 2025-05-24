import React from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";

export function DeviceFrame({ type, width, children }) {
    const getDeviceIcon = () => {
        switch (type) {
            case "mobile":
                return <Smartphone className="h-4 w-4 text-gray-500" />;
            case "tablet":
                return <Tablet className="h-4 w-4 text-gray-500" />;
            case "desktop":
                return <Monitor className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-t-lg p-2 flex items-center justify-between w-full border-t border-x border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    {getDeviceIcon()}
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">{type}</span>
                </div>
                <div className="text-xs text-gray-500">{width}px</div>
            </div>
            <div className="bg-white dark:bg-gray-900 border-x border-b border-gray-200 dark:border-gray-700 rounded-b-lg overflow-hidden" style={{ width: `${width}px`, maxWidth: "100%" }}>
                {children}
            </div>
        </div>
    );
}
