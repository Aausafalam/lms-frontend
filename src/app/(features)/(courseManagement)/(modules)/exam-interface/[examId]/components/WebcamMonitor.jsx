"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, AlertTriangle, RefreshCw } from "lucide-react";

export default function WebcamMonitor({ onFaceDetected, photoInterval = 30, violations = [], setViolations }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const intervalRef = useRef(null);
    const photoIntervalRef = useRef(null);
    const detectionTimeoutRef = useRef(null);

    const [isActive, setIsActive] = useState(false);
    const [stream, setStream] = useState(null);
    const [faceCount, setFaceCount] = useState(0);
    const [lastPhotoTime, setLastPhotoTime] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [faceDetectionHistory, setFaceDetectionHistory] = useState([]);

    // Cleanup function
    const cleanup = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (photoIntervalRef.current) {
            clearInterval(photoIntervalRef.current);
            photoIntervalRef.current = null;
        }
        if (detectionTimeoutRef.current) {
            clearTimeout(detectionTimeoutRef.current);
            detectionTimeoutRef.current = null;
        }
    }, []);

    // Stop webcam function
    const stopWebcam = useCallback(() => {
        cleanup();
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
        setIsActive(false);
        setFaceCount(0);
        setError(null);
    }, [stream, cleanup]);

    // Start webcam function
    const startWebcam = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Stop existing stream first
            if (stream) {
                stopWebcam();
            }

            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640, min: 320 },
                    height: { ideal: 480, min: 240 },
                    facingMode: "user",
                },
                audio: false,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                setStream(mediaStream);
                setIsActive(true);

                // Wait for video to load before starting detection
                videoRef.current.onloadedmetadata = () => {
                    setIsLoading(false);
                    startDetection();
                };
            }
        } catch (error) {
            console.error("Webcam access error:", error);
            setError(error.message);
            setIsLoading(false);
            const errorMessage = error.name === "NotAllowedError" ? "Camera access denied - please allow camera permissions" : "Camera access failed - exam monitoring compromised";

            if (setViolations) {
                setViolations((prev) => [...prev, errorMessage]);
            }
        }
    }, [stream, stopWebcam, setViolations]);

    // Improved face detection with history tracking
    const detectFaces = useCallback(() => {
        if (!videoRef.current || !canvasRef.current || !isActive) return;

        try {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            const ctx = canvas.getContext("2d");

            if (!ctx || video.videoWidth === 0 || video.videoHeight === 0) return;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0);

            // Enhanced mock face detection with more realistic patterns
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const brightness = calculateBrightness(imageData);

            // More sophisticated mock detection based on image characteristics
            let mockFaceCount = 0;

            // Base detection probability based on brightness (faces need adequate lighting)
            const baseProbability = brightness > 50 && brightness < 200 ? 0.85 : 0.3;

            // Add some randomness but with more realistic patterns
            const randomFactor = Math.random();
            if (randomFactor < baseProbability) {
                mockFaceCount = 1;
                // Small chance of multiple faces
                if (randomFactor < 0.05) {
                    mockFaceCount = 2;
                }
            }

            // Update detection history for stability
            setFaceDetectionHistory((prev) => {
                const newHistory = [...prev, mockFaceCount].slice(-5); // Keep last 5 detections

                // Calculate stable face count based on majority in recent history
                const faceCounts = newHistory.reduce((acc, count) => {
                    acc[count] = (acc[count] || 0) + 1;
                    return acc;
                }, {});

                const stableFaceCount = Object.keys(faceCounts).reduce((a, b) => (faceCounts[a] > faceCounts[b] ? a : b));

                const finalFaceCount = parseInt(stableFaceCount);

                // Only update if there's a significant change
                if (finalFaceCount !== faceCount) {
                    setFaceCount(finalFaceCount);

                    if (onFaceDetected) {
                        onFaceDetected(finalFaceCount === 1);
                    }

                    // Add violations with debouncing
                    if (finalFaceCount === 0) {
                        if (setViolations) {
                            setViolations((prev) => [...prev, `No face detected at ${new Date().toLocaleTimeString()}`]);
                        }
                    } else if (finalFaceCount > 1) {
                        if (setViolations) {
                            setViolations((prev) => [...prev, `Multiple faces detected at ${new Date().toLocaleTimeString()}`]);
                        }
                    }
                }

                return newHistory;
            });
        } catch (error) {
            console.error("Face detection error:", error);
        }
    }, [isActive, faceCount, onFaceDetected, setViolations]);

    // Calculate image brightness for better detection
    const calculateBrightness = (imageData) => {
        const data = imageData.data;
        let brightness = 0;
        const sampleSize = Math.min(data.length, 10000); // Sample for performance

        for (let i = 0; i < sampleSize; i += 4) {
            brightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }

        return brightness / (sampleSize / 4);
    };

    // Start detection intervals
    const startDetection = useCallback(() => {
        cleanup(); // Clear any existing intervals

        // Face detection interval
        intervalRef.current = setInterval(detectFaces, 3000); // Every 3 seconds

        // Photo capture interval
        if (photoInterval > 0) {
            photoIntervalRef.current = setInterval(() => {
                capturePhoto();
                setLastPhotoTime(Date.now());
            }, photoInterval * 1000);
        }
    }, [detectFaces, photoInterval, cleanup]);

    // Capture photo function
    const capturePhoto = useCallback(() => {
        if (!videoRef.current || !canvasRef.current || !isActive) return;

        try {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            const ctx = canvas.getContext("2d");

            if (!ctx || video.videoWidth === 0 || video.videoHeight === 0) return;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0);

            // Store photo data (in real implementation, send to server)
            const photoData = canvas.toDataURL("image/jpeg", 0.8);
            console.log("Photo captured at:", new Date().toISOString());

            // In a real implementation, you would send this to your server
            // await sendPhotoToServer(photoData);
        } catch (error) {
            console.error("Photo capture error:", error);
        }
    }, [isActive]);

    // Initialize webcam on mount
    useEffect(() => {
        startWebcam();
        return () => {
            stopWebcam();
        };
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    return (
        <div className="w-fit ml-auto">
            <Card className="shadow-sm border-0 rounded-md overflow-hidden">
                <CardContent className="p-3">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-2">
                                {isLoading ? (
                                    <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
                                ) : isActive ? (
                                    <Camera className="w-4 h-4 text-green-500" />
                                ) : (
                                    <CameraOff className="w-4 h-4 text-red-500" />
                                )}
                                <span className="text-xs font-medium">Webcam Monitor</span>
                            </div>

                            <div className={`w-2 h-2 rounded-full ${isLoading ? "bg-blue-500" : isActive ? "bg-green-500" : "bg-red-500"}`} />
                        </div>

                        <div className="relative">
                            <video ref={videoRef} autoPlay muted playsInline className="w-48 h-36 bg-gray-200 dark:bg-gray-700 rounded-lg object-cover" />
                            <canvas ref={canvasRef} className="hidden" />

                            {faceCount !== 1 && isActive && !isLoading && (
                                <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-red-500" />
                                </div>
                            )}

                            {isLoading && (
                                <div className="absolute inset-0 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                    <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
                                </div>
                            )}
                        </div>

                        <div className="text-xs text-center">
                            {isLoading ? (
                                <span className="text-blue-500">Loading camera...</span>
                            ) : error ? (
                                <span className="text-red-500">Camera error</span>
                            ) : faceCount === 0 ? (
                                <span className="text-red-500">No face detected</span>
                            ) : faceCount === 1 ? (
                                <span className="text-green-500">Face detected</span>
                            ) : (
                                <span className="text-red-500">Multiple faces</span>
                            )}
                        </div>

                        {/* {(!isActive || error) && !isLoading && (
                            <Button size="sm" onClick={startWebcam} className="w-full text-xs">
                                {error ? "Retry Camera" : "Enable Camera"}
                            </Button>
                        )} */}

                        {/* {isActive && !error && (
                            <Button size="sm" onClick={stopWebcam} variant="outline" className="w-full text-xs">
                                Stop Camera
                            </Button>
                        )} */}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
