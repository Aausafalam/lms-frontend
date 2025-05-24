"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { Label } from "./label";

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    name: string;
    label?: string;
    placeholder?: string;
    helperText?: string;
    infoText?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    value: string;
    onChange: (e: any) => void;
    onBlur?: (e: any) => void;
    error?: string;
    touched?: boolean;
    className?: string;
    maxLength?: number;
    maxWords?: number;
    minRows?: number;
    maxRows?: number;
    autoResize?: boolean;
    showWordCount?: boolean;
    showCharCount?: boolean;
    autoFocus?: boolean;
    spellCheck?: boolean;
    labelIcon?: React.ReactNode;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
    id,
    name,
    label,
    placeholder,
    helperText,
    infoText,
    icon,
    disabled = false,
    readOnly = false,
    required = false,
    value,
    onChange,
    onBlur,
    error,
    touched,
    className,
    maxLength,
    maxWords,
    minRows = 3,
    maxRows = 8,
    autoResize = false,
    showWordCount = false,
    showCharCount = false,
    autoFocus = false,
    spellCheck = true,
    labelIcon,
    ...restProps
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Calculate word count
    useEffect(() => {
        if (value) {
            const words = value.trim().split(/\s+/).filter(Boolean);
            setWordCount(words.length);
        } else {
            setWordCount(0);
        }
    }, [value]);

    // Auto-resize functionality
    useEffect(() => {
        if (autoResize && textareaRef.current) {
            const textarea = textareaRef.current;

            // Reset height to calculate the new height
            textarea.style.height = "auto";

            // Calculate new height
            const newHeight = Math.min(
                Math.max(textarea.scrollHeight, minRows * 24), // 24px is approx line height
                maxRows * 24
            );

            textarea.style.height = `${newHeight}px`;
        }
    }, [value, autoResize, minRows, maxRows]);

    useEffect(() => {
        if (autoFocus && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [autoFocus]);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        if (restProps.onFocus) {
            restProps.onFocus(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        if (onBlur) {
            onBlur(e);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;

        // Check if maxWords is set and if we're exceeding it
        if (maxWords && newValue) {
            const words = newValue.trim().split(/\s+/).filter(Boolean);
            if (words.length > maxWords && words.length > wordCount) {
                // Don't update if we're adding words beyond the limit
                return;
            }
        }

        onChange(e);
    };

    const hasError = touched && error;

    return (
        <div className={GlobalUtils.cn("formGroup relative w-full mb-4", className)}>
            {/* Label positioned above the textarea */}
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
                    <span className="relative top-[0.05rem]">{label}</span>
                    {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
            )}

            <div
                className={GlobalUtils.cn(
                    "inputWrapper relative transition-all duration-200 rounded-md border bg-white dark:bg-gray-800 mt-[-0.2rem] mb-[-0.2rem]",
                    isFocused && !hasError && "border-transparent ring-2 ring-primary-500 dark:ring-primary-600 shadow-sm",
                    hasError && "border-transparent ring-2 ring-red-500 dark:ring-red-500",
                    !isFocused && !hasError && "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600",
                    disabled && "opacity-60 bg-gray-50 dark:bg-gray-900"
                )}
            >
                <div className="relative">
                    {icon && <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-gray-500 dark:text-gray-400">{icon}</div>}

                    <textarea
                        ref={textareaRef}
                        id={id}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        spellCheck={spellCheck}
                        rows={!autoResize ? minRows : undefined}
                        style={autoResize ? { resize: "none", overflow: "hidden" } : {}}
                        className={GlobalUtils.cn(
                            "w-full px-4 py-2.5 text-sm bg-transparent border-0 focus:outline-none focus:ring-0",
                            "text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500",
                            icon && "pl-10",
                            disabled && "cursor-not-allowed"
                        )}
                        aria-invalid={!!hasError}
                        aria-describedby={hasError ? `${id}-error` : undefined}
                        {...restProps}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center mt-1.5">
                <div>
                    {/* Error message */}
                    {hasError && (
                        <p id={`${id}-error`} className="text-xs text-red-600 dark:text-red-500">
                            {error}
                        </p>
                    )}

                    {/* Helper text */}
                    {!hasError && helperText && <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}

                    {/* Info text */}
                    {infoText && <p className="text-xs text-gray-400 dark:text-gray-500 italic">{infoText}</p>}
                </div>

                {/* Character and word counters */}
                <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
                    {showCharCount && (
                        <span className={GlobalUtils.cn(maxLength && value.length > maxLength * 0.9 && "text-amber-500", maxLength && value.length >= maxLength && "text-red-500")}>
                            {value.length}
                            {maxLength ? `/${maxLength}` : ""} chars
                        </span>
                    )}

                    {showWordCount && (
                        <span className={GlobalUtils.cn(maxWords && wordCount > maxWords * 0.9 && "text-amber-500", maxWords && wordCount >= maxWords && "text-red-500")}>
                            {wordCount}
                            {maxWords ? `/${maxWords}` : ""} words
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TextareaField;
export const Textarea = TextareaField;
