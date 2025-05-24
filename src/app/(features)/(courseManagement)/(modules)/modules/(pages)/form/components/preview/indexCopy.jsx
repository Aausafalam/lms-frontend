import { useState } from "react";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

export const DevicePreview = ({ previewComponent, initialDevice = "iPhone X" }) => {
    // List of all available device types from react-device-frameset
    const deviceOptions = [
        // iOS Devices
        "iPhone X",
        "iPhone 8",
        "iPhone 8 Plus",
        "iPhone 5s",
        "iPhone 5c",
        "iPhone 4s",
        // Android Devices
        "Galaxy Note 8",
        "Galaxy S5",
        "Nexus 5",
        "Google Pixel",
        "Google Pixel 2 XL",
        // Tablets
        "iPad Mini",
        "iPad Pro",
        // Other
        "MacBook Pro",
        "Lumia 920",
        "Nexus 7",
        "HTC One",
    ];

    // Device orientations
    const orientations = ["portrait", "landscape"];

    // Device colors (not all devices support all colors)
    const colorOptions = ["black", "white", "gold", "silver", "rosegold", "blue", "red", "yellow", "green"];

    // State
    const [selectedDevice, setSelectedDevice] = useState(initialDevice);
    const [orientation, setOrientation] = useState("portrait");
    const [color, setColor] = useState("black");
    const [isAnimated, setIsAnimated] = useState(false);
    const [zoom, setZoom] = useState(1);

    // Helper function to get default color for a device
    const getDefaultColorForDevice = (device) => {
        // Some devices have specific color options
        switch (device) {
            case "iPhone 5c":
                return "white";
            default:
                return "black";
        }
    };

    // Handle device change
    const handleDeviceChange = (device) => {
        setSelectedDevice(device);
        setColor(getDefaultColorForDevice(device));
    };

    // Handle zoom change
    const handleZoomChange = (e) => {
        setZoom(parseFloat(e.target.value));
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full mb-6 p-4 bg-gray-100 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Device selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Device</label>
                        <select
                            value={selectedDevice}
                            onChange={(e) => handleDeviceChange(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {deviceOptions.map((device) => (
                                <option key={device} value={device}>
                                    {device}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Orientation selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Orientation</label>
                        <div className="flex space-x-4">
                            {orientations.map((orient) => (
                                <label key={orient} className="inline-flex items-center">
                                    <input type="radio" value={orient} checked={orientation === orient} onChange={() => setOrientation(orient)} className="h-4 w-4 text-indigo-600 border-gray-300" />
                                    <span className="ml-2 capitalize">{orient}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Color selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                        <select
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {colorOptions.map((colorOption) => (
                                <option key={colorOption} value={colorOption}>
                                    {colorOption.charAt(0).toUpperCase() + colorOption.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Animation and zoom controls */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Animation</label>
                        <div className="flex items-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={isAnimated} onChange={() => setIsAnimated(!isAnimated)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-700">Enable Animation</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Zoom: {zoom}x</label>
                        <input type="range" min="0.5" max="1.5" step="0.1" value={zoom} onChange={handleZoomChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Device preview */}
            <div className="transform transition-all duration-300" style={{ transform: `scale(${zoom})` }}>
                <DeviceFrameset device={selectedDevice} color={color} orientation={orientation} className={isAnimated ? "animated" : ""}>
                    {previewComponent}
                </DeviceFrameset>
            </div>

            {/* Device info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg w-full max-w-md">
                <h3 className="text-lg font-medium text-gray-900">Current Configuration</h3>
                <ul className="mt-2 text-sm text-gray-700">
                    <li>
                        <span className="font-medium">Device:</span> {selectedDevice}
                    </li>
                    <li>
                        <span className="font-medium">Orientation:</span> {orientation}
                    </li>
                    <li>
                        <span className="font-medium">Color:</span> {color}
                    </li>
                    <li>
                        <span className="font-medium">Animation:</span> {isAnimated ? "Enabled" : "Disabled"}
                    </li>
                    <li>
                        <span className="font-medium">Zoom:</span> {zoom}x
                    </li>
                </ul>
            </div>
        </div>
    );
};

// For demonstration purposes, let's create a simple default preview component
