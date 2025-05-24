"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import GlobalUtils from "@/lib/utils";
import { Label } from "./label";

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectFieldProps {
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
    value: string | string[];
    onChange: (e: any) => void;
    onBlur?: (e: any) => void;
    error?: string;
    touched?: boolean;
    className?: string;
    options: SelectOption[];
    isLoading?: boolean;
    isMulti?: boolean;
    isSearchable?: boolean;
    isClearable?: boolean;
    maxSelections?: number;
    autoFocus?: boolean;
    groupBy?: (option: SelectOption) => string;
    noOptionsMessage?: string;
    labelIcon?: React.ReactNode;
}

const SelectField: React.FC<SelectFieldProps> = ({
    id,
    name,
    label,
    placeholder = "Select an option",
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
    options = [],
    isLoading = false,
    isMulti = false,
    isSearchable = false,
    isClearable = false,
    maxSelections,
    autoFocus = false,
    labelIcon,
    groupBy,
    noOptionsMessage = "No options available",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);

    // Determine if we're dealing with multi-select or single select
    const selectedValues = Array.isArray(value) ? value : [value].filter(Boolean);

    // Filter options based on search input
    const filteredOptions = options.filter((option) => !isSearchable || searchValue === "" || option.label.toLowerCase().includes(searchValue.toLowerCase()));

    // Group options if groupBy function is provided
    const groupedOptions = groupBy
        ? filteredOptions.reduce((groups, option) => {
              const groupName = groupBy(option);
              if (!groups[groupName]) {
                  groups[groupName] = [];
              }
              groups[groupName].push(option);
              return groups;
          }, {} as Record<string, SelectOption[]>)
        : null;

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    useEffect(() => {
        // Click outside listener to close dropdown
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                if (onBlur) {
                    const event = { target: { name, value } };
                    onBlur(event);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [name, onBlur, value]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled || readOnly) return;

        if (e.key === "Enter" && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
            return;
        }

        if (!isOpen) return;

        // Arrow down
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
        }
        // Arrow up
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }
        // Enter
        else if (e.key === "Enter" && selectedIndex >= 0) {
            e.preventDefault();
            handleOptionSelect(filteredOptions[selectedIndex]);
        }
        // Escape
        else if (e.key === "Escape") {
            e.preventDefault();
            setIsOpen(false);
        }
    };

    const handleOptionSelect = (option: SelectOption) => {
        if (option.disabled) return;

        if (isMulti) {
            const isSelected = selectedValues.includes(option.value);
            let newValue: string[];

            if (isSelected) {
                // Remove the option if already selected
                newValue = selectedValues.filter((val) => val !== option.value);
            } else {
                // Add the option if not at max selections
                if (maxSelections && selectedValues.length >= maxSelections) {
                    return; // Don't add if at max selections
                }
                newValue = [...selectedValues, option.value];
            }

            const event = {
                target: { name, value: newValue },
            };
            console.log("event", event);
            onChange(event);

            // Keep dropdown open for multi-select
            if (isSearchable && inputRef.current) {
                inputRef.current.focus();
                setSearchValue("");
            }
        } else {
            // Single select
            const event = {
                target: { name, value: option.value },
            };
            onChange(event);
            setIsOpen(false);
            setSearchValue("");
        }
    };

    const handleRemoveValue = (optionValue: string, e?: React.MouseEvent) => {
        e?.stopPropagation();

        if (isMulti) {
            const newValue = selectedValues.filter((val) => val !== optionValue);
            const event = {
                target: { name, value: newValue },
            };
            onChange(event);
        } else {
            const event = {
                target: { name, value: "" },
            };
            onChange(event);
        }
    };

    const handleClearAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        const event = {
            target: { name, value: isMulti ? [] : "" },
        };
        onChange(event);
    };

    const handleToggleDropdown = () => {
        if (disabled || readOnly) return;

        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);

        if (newIsOpen && isSearchable && inputRef.current) {
            // Focus the search input when opening
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setSelectedIndex(-1);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent) => {
        // Only blur if clicking outside the component
        if (!selectRef.current?.contains(e.relatedTarget as Node)) {
            setIsFocused(false);
            if (onBlur) {
                const event = { target: { name, value } };
                onBlur(event);
            }
        }
    };

    // Get selected option labels for display
    const getSelectedLabels = () => {
        return selectedValues.map((val) => options.find((opt) => opt.value === val)?.label || val).filter(Boolean);
    };

    const hasError = touched && error;

    return (
        <div className={GlobalUtils.cn("formGroup relative w-full mb-4", className)}>
            {/* Label positioned above the select */}
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
                ref={selectRef}
                className={GlobalUtils.cn(
                    "selectWrapper relative transition-all duration-200 rounded-md border bg-white dark:bg-gray-800 mt-[-0.2rem] mb-[-0.2rem]",
                    isFocused && !hasError && "border-transparent ring-2 ring-primary-500 dark:ring-primary-600 shadow-sm",
                    hasError && "border-transparent ring-2 ring-red-500 dark:ring-red-500",
                    !isFocused && !hasError && "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600",
                    disabled && "opacity-60 bg-gray-50 dark:bg-gray-900",
                    isOpen && "z-20"
                )}
            >
                {/* Select control */}
                <div
                    className={GlobalUtils.cn("flex items-center min-h-[42px] px-4 py-2 cursor-pointer", disabled && "cursor-not-allowed", readOnly && "cursor-default")}
                    onClick={handleToggleDropdown}
                    onKeyDown={handleKeyDown}
                    tabIndex={disabled ? -1 : 0}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-controls={`${id}-listbox`}
                    aria-labelledby={label ? `${id}-label` : undefined}
                    aria-disabled={disabled}
                    aria-readonly={readOnly}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                    {/* Icon */}
                    {icon && <div className="mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0">{icon}</div>}

                    {/* Selected values display */}
                    <div className="flex-grow flex flex-wrap gap-1">
                        {isMulti ? (
                            selectedValues.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                    {getSelectedLabels().map((label, index) => (
                                        <div key={`${label}-${index}`} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-md px-2 py-1 flex items-center">
                                            <span className="mr-1">{label}</span>
                                            {!readOnly && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleRemoveValue(selectedValues[index], e)}
                                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                                    aria-label={`Remove ${label}`}
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-gray-400 dark:text-gray-500 text-sm">{placeholder}</span>
                            )
                        ) : selectedValues[0] ? (
                            <span className="text-gray-900 dark:text-gray-100 text-sm">{options.find((opt) => opt.value === selectedValues[0])?.label || selectedValues[0]}</span>
                        ) : (
                            <span className="text-gray-400 dark:text-gray-500 text-sm">{placeholder}</span>
                        )}
                    </div>

                    {/* Clear button */}
                    {isClearable && selectedValues.length > 0 && !readOnly && (
                        <button type="button" className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 mr-1" onClick={handleClearAll} aria-label="Clear selection">
                            <X className="h-4 w-4" />
                        </button>
                    )}

                    {/* Dropdown indicator */}
                    <div className="text-gray-400 dark:text-gray-500 ml-1">{isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</div>
                </div>

                {/* Dropdown menu */}
                {isOpen && (
                    <div
                        ref={optionsRef}
                        className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 max-h-60 overflow-auto"
                        id={`${id}-listbox`}
                        role="listbox"
                        aria-multiselectable={isMulti}
                    >
                        {/* Search input */}
                        {isSearchable && (
                            <div className="sticky top-0 p-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="w-full px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600"
                                    placeholder="Search..."
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}
                                    aria-autocomplete="list"
                                    autoComplete="off"
                                />
                            </div>
                        )}

                        {/* Loading state */}
                        {isLoading ? (
                            <div className="p-3 text-center text-gray-500 dark:text-gray-400">Loading...</div>
                        ) : filteredOptions.length === 0 ? (
                            <div className="p-3 text-center text-gray-500 dark:text-gray-400">{noOptionsMessage}</div>
                        ) : groupedOptions ? (
                            // Grouped options
                            Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                                <div key={groupName}>
                                    <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">{groupName}</div>
                                    {groupOptions.map((option, index) => (
                                        <div
                                            key={`${option.value}-${index}`}
                                            className={GlobalUtils.cn(
                                                "px-3 py-2 text-sm cursor-pointer",
                                                selectedValues.includes(option.value) && "bg-primary-50 dark:bg-primary-900/30",
                                                selectedIndex === filteredOptions.indexOf(option) && "bg-gray-100 dark:bg-gray-700",
                                                option.disabled && "opacity-50 cursor-not-allowed",
                                                "hover:bg-gray-100 dark:hover:bg-gray-700"
                                            )}
                                            onClick={() => handleOptionSelect(option)}
                                            role="option"
                                            aria-selected={selectedValues.includes(option.value)}
                                            aria-disabled={option.disabled}
                                        >
                                            <div className="flex items-center">
                                                {isMulti && (
                                                    <div className="mr-2 flex-shrink-0">
                                                        <div
                                                            className={GlobalUtils.cn(
                                                                "w-4 h-4 border rounded flex items-center justify-center",
                                                                selectedValues.includes(option.value)
                                                                    ? "bg-primary-500 border-primary-500 dark:bg-primary-600 dark:border-primary-600"
                                                                    : "border-gray-300 dark:border-gray-600"
                                                            )}
                                                        >
                                                            {selectedValues.includes(option.value) && <Check className="h-3 w-3 text-white" />}
                                                        </div>
                                                    </div>
                                                )}
                                                <span className="text-black dark:text-white">{option.label}</span>
                                                {!isMulti && selectedValues.includes(option.value) && <Check className="ml-auto h-4 w-4 text-primary-500 dark:text-primary-600" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            // Flat options list
                            filteredOptions.map((option, index) => (
                                <div
                                    key={`${option.value}-${index}`}
                                    className={GlobalUtils.cn(
                                        "px-3 py-2 text-sm cursor-pointer",
                                        selectedValues.includes(option.value) && "bg-primary-50 dark:bg-primary-900/30",
                                        selectedIndex === index && "bg-gray-100 dark:bg-gray-700",
                                        option.disabled && "opacity-50 cursor-not-allowed",
                                        "hover:bg-gray-100 dark:hover:bg-gray-700"
                                    )}
                                    onClick={() => handleOptionSelect(option)}
                                    role="option"
                                    aria-selected={selectedValues.includes(option.value)}
                                    aria-disabled={option.disabled}
                                >
                                    <div className="flex items-center">
                                        {isMulti && (
                                            <div className="mr-2 flex-shrink-0">
                                                <div
                                                    className={GlobalUtils.cn(
                                                        "w-4 h-4 border rounded flex items-center justify-center",
                                                        selectedValues.includes(option.value)
                                                            ? "bg-primary-500 border-primary-500 dark:bg-primary-600 dark:border-primary-600"
                                                            : "border-gray-300 dark:border-gray-600"
                                                    )}
                                                >
                                                    {selectedValues.includes(option.value) && <Check className="h-3 w-3 text-white" />}
                                                </div>
                                            </div>
                                        )}
                                        <span className="text-black dark:text-white">{option.label}</span>
                                        {!isMulti && selectedValues.includes(option.value) && <Check className="ml-auto h-4 w-4 text-primary-500 dark:text-primary-600" />}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

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

            {/* Selection count for multi-select */}
            {isMulti && maxSelections && selectedValues.length > 0 && (
                <div className="flex justify-end">
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {selectedValues.length}/{maxSelections}
                    </span>
                </div>
            )}
        </div>
    );
};

export default SelectField;
export const Select = SelectField;
