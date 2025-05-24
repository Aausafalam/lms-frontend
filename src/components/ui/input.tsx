"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import GlobalUtils from "@/lib/utils";
import { Label } from "./label";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    name: string;
    label?: string;
    type?: string;
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
    suggestions?: string[];
    isLoading?: boolean;
    showPasswordStrength?: boolean;
    showPasswordToggle?: boolean;
    maxLength?: number;
    autoFocus?: boolean;
    labelIcon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    name,
    label,
    type = "text",
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
    suggestions = [],
    isLoading = false,
    showPasswordStrength = false,
    showPasswordToggle = false,
    maxLength,
    autoFocus = false,
    labelIcon,
    ...restProps
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    useEffect(() => {
        // Click outside listener to close suggestions
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Calculate password strength
    useEffect(() => {
        if (type === "password" && showPasswordStrength && value) {
            let strength = 0;

            // Length check
            if (value.length >= 8) strength += 1;

            // Complexity checks
            if (/[A-Z]/.test(value)) strength += 1;
            if (/[a-z]/.test(value)) strength += 1;
            if (/[0-9]/.test(value)) strength += 1;
            if (/[^A-Za-z0-9]/.test(value)) strength += 1;

            setPasswordStrength(strength);

            // Password validation error message
            if (value.length < 8) {
                setPasswordError("Password must be at least 8 characters");
            } else if (strength < 3) {
                setPasswordError("Add uppercase, lowercase, numbers or special characters");
            } else {
                setPasswordError("");
            }
        }
    }, [value, type, showPasswordStrength]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions || suggestions.length === 0) return;

        // Arrow down
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex));
        }
        // Arrow up
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        }
        // Enter
        else if (e.key === "Enter" && selectedIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(suggestions[selectedIndex]);
        }
        // Escape
        else if (e.key === "Escape") {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        if (onChange) {
            const event = {
                target: { name, value: suggestion },
            };
            onChange(event);
        }
        setShowSuggestions(false);
        setSelectedIndex(-1);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const getStrengthColor = () => {
        if (passwordStrength <= 1) return "bg-red-500 dark:bg-red-600";
        if (passwordStrength <= 3) return "bg-yellow-500 dark:bg-yellow-600";
        return "bg-green-500 dark:bg-green-600";
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        setShowSuggestions(true);
        if (restProps.onFocus) {
            restProps.onFocus(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (onBlur) {
            onBlur(e);
        }
    };

    const inputType = type === "password" && passwordVisible ? "text" : type;
    const hasError = touched && error;

    return (
        <div className={GlobalUtils.cn("formGroup relative w-full mb-4", className)}>
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
                    {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">{icon}</div>}

                    <input
                        ref={inputRef}
                        id={id}
                        type={inputType}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        className={GlobalUtils.cn(
                            "w-full px-4 py-2.5 text-sm bg-transparent border-0 focus:outline-none focus:ring-0",
                            "text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500",
                            icon && "pl-10",
                            showPasswordToggle && "pr-10",
                            disabled && "cursor-not-allowed"
                        )}
                        aria-invalid={!!hasError}
                        aria-describedby={hasError ? `${id}-error` : undefined}
                        aria-expanded={suggestions.length > 0 ? showSuggestions : undefined}
                        aria-autocomplete={suggestions.length > 0 ? "list" : undefined}
                        aria-controls={suggestions.length > 0 ? `${id}-suggestions` : undefined}
                        {...restProps}
                    />

                    {type === "password" && showPasswordToggle && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            onClick={togglePasswordVisibility}
                            aria-label={passwordVisible ? "Hide password" : "Show password"}
                        >
                            {passwordVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </button>
                    )}
                </div>
            </div>

            {/* Autocomplete suggestions */}
            {showSuggestions && suggestions.length > 0 && (
                <ul
                    ref={suggestionsRef}
                    id={`${id}-suggestions`}
                    className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-xs overflow-auto focus:outline-none"
                    role="listbox"
                >
                    {isLoading ? (
                        <li className="px-4 py-2 text-gray-500 dark:text-gray-400">Loading...</li>
                    ) : (
                        suggestions.map((suggestion, index) => (
                            <li
                                key={`${suggestion}-${index}`}
                                className={GlobalUtils.cn(
                                    "cursor-pointer select-none relative py-2 pl-4 pr-9",
                                    index === selectedIndex ? "bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100" : "text-gray-900 dark:text-gray-100",
                                    "hover:bg-primary-50 dark:hover:bg-primary-800"
                                )}
                                onClick={() => handleSuggestionClick(suggestion)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                role="option"
                                aria-selected={index === selectedIndex}
                            >
                                {suggestion}
                            </li>
                        ))
                    )}
                </ul>
            )}

            {/* Password strength indicator */}
            {type === "password" && showPasswordStrength && value && (
                <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Password strength:</span>
                        <span
                            className={GlobalUtils.cn(
                                "text-xs font-medium",
                                passwordStrength <= 1 ? "text-red-500 dark:text-red-400" : passwordStrength <= 3 ? "text-yellow-500 dark:text-yellow-400" : "text-green-500 dark:text-green-400"
                            )}
                        >
                            {passwordStrength <= 1 ? "Weak" : passwordStrength <= 3 ? "Medium" : "Strong"}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div className={GlobalUtils.cn("h-1 rounded-full", getStrengthColor())} style={{ width: `${(passwordStrength / 5) * 100}%` }} />
                    </div>
                    {passwordError && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{passwordError}</p>}
                </div>
            )}

            {/* Error message */}
            {hasError && (
                <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600 dark:text-red-500">
                    {error}
                </p>
            )}

            {/* Helper text */}
            {!hasError && helperText && <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}

            {/* Info text */}
            {infoText && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 italic">{infoText}</p>}

            {/* Character counter */}
            {maxLength && value && (
                <div className="flex justify-end">
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {value.length}/{maxLength}
                    </span>
                </div>
            )}
        </div>
    );
};

export default InputField;
export const Input = InputField;
