"use client";

import type React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, FileIcon, AlertCircle, Trash2, RefreshCw, FileText } from "lucide-react";
import GlobalUtils from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "./label";
import fileUploadApiService from "@/services/api/fileUpload";

interface FileUploadFieldProps {
    id: string;
    name: string;
    label?: string;
    helperText?: string;
    infoText?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    touched?: boolean;
    className?: string;
    uploadPath: string;
    maxFileSize?: number;
    acceptedFormats?: string[];
    multiple?: boolean;
    onFilesUploaded?: (fileUrls: string[]) => void;
    onUploadProgress?: (progress: number) => void;
    onError?: (error: string) => void;
    labelIcon?: React.ReactNode;
    onChange?: (error: object) => void;
}

interface FileWithProgress {
    file: File;
    id: string;
    progress: number;
    status: "uploading" | "success" | "error";
    url?: string;
    error?: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
    id,
    name,
    label,
    helperText,
    infoText,
    icon,
    disabled = false,
    required = false,
    error,
    touched,
    className,
    uploadPath,
    maxFileSize = 25 * 1024 * 1024, // 25MB default
    acceptedFormats = ["xls", "xlsx"],
    multiple = false,
    onFilesUploaded,
    onUploadProgress,
    onError,
    labelIcon,
    onChange,
}) => {
    const [files, setFiles] = useState<FileWithProgress[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropAreaRef = useRef<HTMLDivElement>(null);

    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    const validateFile = (file: File): string | null => {
        // Check file size
        if (file.size > maxFileSize) {
            return `File size exceeds the maximum limit of ${formatBytes(maxFileSize)}`;
        }

        // Check file format
        const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
        if (acceptedFormats.length > 0 && !acceptedFormats.includes(fileExtension)) {
            return `File format not supported. Accepted formats: ${acceptedFormats.join(", ")}`;
        }

        return null;
    };

    const uploadFile = async (fileWithProgress: FileWithProgress) => {
        try {
            const formData = new FormData();
            formData.append(name, fileWithProgress.file);

            // Update file status to uploading
            setFiles((prevFiles) => prevFiles.map((f) => (f.id === fileWithProgress.id ? { ...f, status: "uploading", progress: 0 } : f)));

            // const xhr = new XMLHttpRequest();

            // xhr.upload.addEventListener("progress", (event) => {
            //     if (event.lengthComputable) {
            //         const progress = Math.round((event.loaded / event.total) * 100);

            //         // Update progress for this specific file
            //         setFiles((prevFiles) => prevFiles.map((f) => (f.id === fileWithProgress.id ? { ...f, progress } : f)));

            //         if (onUploadProgress) {
            //             onUploadProgress(progress);
            //         }
            //     }
            // });

            // xhr.addEventListener("load", () => {
            //     if (xhr.status >= 200 && xhr.status < 300) {
            //         try {
            //             const response = JSON.parse(xhr.responseText);

            //             // Update file status to success and store the URL
            //             setFiles((prevFiles) => prevFiles.map((f) => (f.id === fileWithProgress.id ? { ...f, status: "success", url: response.url, progress: 100 } : f)));

            //             // Collect all successfully uploaded file URLs
            //             const updatedFiles = [...files];
            //             const successfulFiles = updatedFiles.filter((f) => f.status === "success" && f.url).map((f) => f.url as string);

            //             if (onFilesUploaded) {
            //                 onFilesUploaded(successfulFiles);
            //             }
            //         } catch (error) {
            //             handleUploadError(fileWithProgress.id, "Failed to parse server response");
            //         }
            //     } else {
            //         handleUploadError(fileWithProgress.id, `Upload failed with status ${xhr.status}`);
            //     }
            // });

            // xhr.addEventListener("error", () => {
            //     handleUploadError(fileWithProgress.id, "Network error occurred during upload");
            // });

            // xhr.addEventListener("abort", () => {
            //     handleUploadError(fileWithProgress.id, "Upload was aborted");
            // });

            // xhr.open("POST", uploadPath, true);
            // xhr.send(formData);
            const data = await fileUploadApiService.uploadFile(uploadPath, formData, {}, "", "");
            onChange?.({ target: { name, value: { fileId: data.fileId } } });
        } catch (error) {
            handleUploadError(fileWithProgress.id, "An unexpected error occurred");
        }
    };

    const handleUploadError = (fileId: string, errorMessage: string) => {
        setFiles((prevFiles) => prevFiles.map((f) => (f.id === fileId ? { ...f, status: "error", error: errorMessage } : f)));

        if (onError) {
            onError(errorMessage);
        }
    };

    const handleFileSelect = (selectedFiles: FileList | null) => {
        if (!selectedFiles || selectedFiles.length === 0) return;

        const newFilesArray: FileWithProgress[] = [];

        Array.from(selectedFiles).forEach((file) => {
            const validationError = validateFile(file);

            if (validationError) {
                if (onError) onError(validationError);
                return;
            }

            const fileWithProgress: FileWithProgress = {
                file,
                id: crypto.randomUUID(),
                progress: 0,
                status: "uploading",
            };

            newFilesArray.push(fileWithProgress);
        });

        if (newFilesArray.length === 0) return;

        if (!multiple) {
            // If multiple is false, replace existing files
            setFiles(newFilesArray);
        } else {
            // If multiple is true, add to existing files
            setFiles((prevFiles) => [...prevFiles, ...newFilesArray]);
        }

        // Start uploading each file
        newFilesArray.forEach((fileWithProgress) => {
            uploadFile(fileWithProgress);
        });
    };

    const handleDragEnter = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setDragCounter((prev) => prev + 1);
            if (!disabled) {
                setIsDragging(true);
            }
        },
        [disabled]
    );

    const handleDragLeave = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setDragCounter((prev) => prev - 1);
            if (dragCounter <= 1) {
                setIsDragging(false);
                setDragCounter(0);
            }
        },
        [dragCounter]
    );

    const handleDragOver = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            if (!disabled) {
                setIsDragging(true);
            }
        },
        [disabled]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            setDragCounter(0);

            if (!disabled) {
                const droppedFiles = e.dataTransfer.files;
                handleFileSelect(droppedFiles);
            }
        },
        [disabled]
    );

    const handleClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleRemoveFile = (fileId: string, e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId));
    };

    const handleRetryUpload = (fileId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const fileToRetry = files.find((f) => f.id === fileId);
        if (fileToRetry) {
            uploadFile(fileToRetry);
        }
    };

    const getFileIcon = (fileName: string) => {
        const extension = fileName.split(".").pop()?.toLowerCase() || "";

        switch (extension) {
            case "pdf":
                return <FileText className="h-5 w-5 text-red-500" />;
            case "doc":
            case "docx":
                return <FileText className="h-5 w-5 text-blue-500" />;
            case "xls":
            case "xlsx":
                return <FileText className="h-5 w-5 text-green-500" />;
            case "ppt":
            case "pptx":
                return <FileText className="h-5 w-5 text-orange-500" />;
            default:
                return <FileIcon className="h-5 w-5 text-gray-500" />;
        }
    };

    const hasError = touched && error;
    const acceptedFormatsString = acceptedFormats.map((format) => `.${format}`).join(",");

    // Clean up event listeners
    useEffect(() => {
        return () => {
            setDragCounter(0);
            setIsDragging(false);
        };
    }, []);

    return (
        <div className={GlobalUtils.cn("formGroup relative w-full mb-6", className)}>
            {/* Label positioned above the input */}
            {label && (
                <Label
                    htmlFor={id}
                    className={GlobalUtils.cn(
                        "flex items-center gap-1",
                        "label  text-[.8125rem] font-medium mb-1.5 transition-colors",
                        isFocused && !hasError && "text-primary-500 dark:text-primary-600",
                        hasError && "text-red-500 dark:text-red-500",
                        !isFocused && !hasError && "text-gray-700 dark:text-gray-300"
                    )}
                >
                    {labelIcon && <span className="">{labelIcon}</span>}
                    <span>{label}</span>
                    {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
            )}

            <div
                ref={dropAreaRef}
                className={GlobalUtils.cn(
                    "rounded-lg p-10 text-center bg-orange-50/50 dark:bg-orange-950/10 transition-all hover:bg-orange-50 dark:hover:bg-orange-950/20",
                    "relative transition-all duration-300",
                    "min-h-[180px] flex flex-col items-center justify-center p-6",
                    isDragging && "border-primary-400 border-dashed bg-primary-50/50 dark:bg-primary-900/10 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]",
                    isFocused && !hasError && !isDragging && "border-2 border-dashed border-orange-200 dark:border-orange-900/30 hover:border-orange-400 dark:hover:border-orange-800",
                    hasError && "border-transparent ring-2 ring-red-400 dark:ring-red-500",
                    !isFocused && !hasError && !isDragging && "border-2 border-dashed border-orange-200 dark:border-orange-900/30 hover:border-orange-400 dark:hover:border-orange-800",
                    disabled && "opacity-60 bg-gray-50 dark:bg-gray-900 cursor-not-allowed"
                    // files.length > 0 && "border-solid border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                tabIndex={disabled ? -1 : 0}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    id={id}
                    name={name}
                    accept={acceptedFormatsString}
                    multiple={multiple}
                    disabled={disabled}
                    className="sr-only"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    aria-invalid={!!hasError}
                    aria-describedby={hasError ? `${id}-error` : undefined}
                />

                <AnimatePresence>
                    {files.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col items-center"
                        >
                            <div
                                className={GlobalUtils.cn(
                                    "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300",
                                    isDragging
                                        ? "bg-primary-100 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400 scale-110"
                                        : "bg-primary-100 dark:bg-gray-700 text-primary-500 dark:text-primary-400"
                                )}
                            >
                                <Upload className={GlobalUtils.cn("h-7 w-7 transition-all duration-300", isDragging && "animate-pulse")} />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 text-center font-medium mb-2">{isDragging ? "Drop your files here" : "Drag and Drop files here"}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                or{" "}
                                <span className="text-primary-500 dark:text-primary-400 font-medium px-1 py-0.5 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors cursor-pointer">
                                    browse files
                                </span>
                            </p>
                        </motion.div>
                    ) : (
                        <div className="w-full">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {files.length} {files.length === 1 ? "File" : "Files"}
                                </h4>
                                {multiple && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (fileInputRef.current) {
                                                fileInputRef.current.click();
                                            }
                                        }}
                                        className="text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-3 py-1.5 rounded-full font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                                    >
                                        Add more
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                                <AnimatePresence initial={false}>
                                    {files.map((file) => (
                                        <motion.div
                                            key={file.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div
                                                className={GlobalUtils.cn(
                                                    "group relative rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200",
                                                    file.status === "success" && "bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800/30",
                                                    file.status === "error" && "bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30",
                                                    file.status === "uploading" && "bg-gray-50 dark:bg-gray-800/50"
                                                )}
                                            >
                                                <div className="flex items-center justify-between p-3">
                                                    <div className="flex items-center space-x-3 overflow-hidden">
                                                        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                            {getFileIcon(file.file.name)}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{file.file.name}</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{formatBytes(file.file.size)}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        {file.status === "uploading" && (
                                                            <span className="text-xs font-medium text-primary-600 dark:text-primary-400 min-w-[40px] text-right">{file.progress}%</span>
                                                        )}
                                                        {file.status === "error" && (
                                                            <button
                                                                type="button"
                                                                onClick={(e) => handleRetryUpload(file.id, e)}
                                                                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                                aria-label="Retry upload"
                                                            >
                                                                <RefreshCw className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handleRemoveFile(file.id, e)}
                                                            className="p-1.5 rounded-full text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                            aria-label="Remove file"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {file.status === "uploading" && (
                                                    <div className="h-1 w-full bg-gray-200 dark:bg-gray-700">
                                                        <div className="h-1 bg-primary-500 dark:bg-primary-400 transition-all duration-300 ease-out" style={{ width: `${file.progress}%` }} />
                                                    </div>
                                                )}

                                                {file.status === "success" && <div className="h-1 w-full bg-green-500 dark:bg-green-400" />}

                                                {file.status === "error" && <div className="h-1 w-full bg-red-500 dark:bg-red-400" />}

                                                {file.status === "error" && file.error && (
                                                    <div className="px-3 py-2 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800/30">
                                                        <p className="text-xs text-red-600 dark:text-red-400 flex items-center">
                                                            <AlertCircle className="h-3 w-3 mr-1.5 flex-shrink-0" />
                                                            {file.error}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex justify-between mt-2">
                <div className="flex items-center">
                    {acceptedFormats.length > 0 && (
                        <div className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"></span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{acceptedFormats.map((format) => format.toUpperCase()).join(", ")}</p>
                        </div>
                    )}
                </div>
                {maxFileSize && (
                    <div className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"></span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Max File Size: {formatBytes(maxFileSize)}</p>
                    </div>
                )}
            </div>

            {/* Error message */}
            {hasError && (
                <p id={`${id}-error`} className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1.5 flex-shrink-0" />
                    {error}
                </p>
            )}

            {/* Helper text */}
            {!hasError && helperText && <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}

            {/* Info text */}
            {infoText && <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500 italic">{infoText}</p>}
        </div>
    );
};

export default FileUploadField;
export const FileUpload = FileUploadField;
