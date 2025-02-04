import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import "../../../styles/root.css";
import FormUtils from "@/components/form/utils";

const InputField = ({ formField, formValues, maskedValues, errors, ...restProps }) => {
    const {
        id,
        name,
        label,
        type = "text",
        placeholder = "",

        // Form handling
        value,
        defaultValue,
        groupFieldDefaultValue,
        onChange,
        customOnChange,
        onBlur,

        // Validation
        required = false,
        requiredInfo,
        validationRules = {},
        customValidation,
        validateOnChange = false,
        validateOnBlur = true,

        // State
        disabled = false,
        readOnly = false,

        // UI Elements
        helperText,
        infoText,
        className = "",
        labelClassName = "",

        // custom styles
        style = {},
        inputStyle = {},
        labelStyle = {},

        // Additional content
        labelChild,
        contentChild,

        // New auto-suggestion props
        autoSuggestion = {
            initialData: [],
            autoSuggestionUrl: "",
            minChars: 2,
            maxSuggestions: 10,
            debounceMs: 300,
        },
    } = formField;
    // console.log(autoSuggestion);
    // Internal state
    const [inputValue, setInputValue] = useState(groupFieldDefaultValue || maskedValues?.[name] || value || "");
    const [error, setError] = useState("");
    const [touched, setTouched] = useState(false);

    // state for auto-suggestions
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // Refs
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const debounceTimerRef = useRef(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        if (autoSuggestion.initialData) {
            setSuggestions(autoSuggestion.initialData);
        }
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setSuggestions(autoSuggestion.initialData);
    }, [autoSuggestion]);

    // Update value when prop changes
    useEffect(() => {
        if (value !== undefined) {
            setInputValue(value);
        }
    }, [value]);

    useEffect(() => {
        if (errors?.[name]) {
            setError(errors[name]);
            setTouched(true);
        }
    }, [errors?.[name]]);

    useEffect(() => {
        setInputValue(defaultValue);
    }, [defaultValue]);

    // Fetch suggestions
    const fetchSuggestions = async (searchText) => {
        if (!searchText || searchText.length < autoSuggestion.minChars) {
            setSuggestions(autoSuggestion.initialData || []);
            return;
        }

        if (!autoSuggestion.autoSuggestionUrl) {
            const filteredSuggestions = (autoSuggestion.initialData || []).filter((item) => item.toLowerCase().includes(searchText.toLowerCase())).slice(0, autoSuggestion.maxSuggestions);
            setSuggestions(filteredSuggestions);
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${autoSuggestion.autoSuggestionUrl}?text=${encodeURIComponent(searchText)}`);
            if (!response.ok) throw new Error("Failed to fetch suggestions");
            const data = await response.json();
            setSuggestions(data.slice(0, autoSuggestion.maxSuggestions));
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounced fetch
    const debouncedFetch = (searchText) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            fetchSuggestions(searchText);
        }, autoSuggestion.debounceMs);
    };

    // Validation logic
    const validateInput = (valueToValidate) => {
        let validationError = FormUtils.validateField(valueToValidate, validationRules, formField);
        // console.log("validationError", validationError);
        if (!validationError && customValidation) {
            validationError = customValidation(valueToValidate);
        }
        setError(validationError || null);
        return !validationError;
    };

    // Event handlers
    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setShowSuggestions(true);
        setSelectedIndex(-1);

        if (validateOnChange) {
            validateInput(newValue);
        }

        debouncedFetch(newValue);

        if (onChange) onChange(e);
        if (customOnChange) customOnChange(e);
    };

    const handleBlur = (e) => {
        setTouched(true);

        if (validateOnBlur) {
            validateInput(e.target.value);
        }

        if (onBlur) {
            onBlur(e);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setShowSuggestions(false);
        setSelectedIndex(-1);

        // Trigger validation
        if (validateOnChange) {
            validateInput(suggestion);
        }

        // Simulate change event
        const simulatedEvent = {
            target: { value: suggestion, name },
            currentTarget: inputRef.current,
        };
        if (onChange) onChange(simulatedEvent);
        if (customOnChange) customOnChange(simulatedEvent);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSuggestionClick(suggestions[selectedIndex]);
                }
                break;
            case "Escape":
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
            default:
                break;
        }
    };

    // Class names
    const formGroupClasses = `
        ${styles.formGroup}
        ${type ? styles[type] : ""}
        ${className}
        ${touched && error ? styles.hasError : ""}
    `.trim();

    const labelClasses = `
        ${styles.label}
        ${labelClassName}
    `.trim();

    return (
        <div className={formGroupClasses} style={style}>
            <div className={styles.inputWrapper}>
                {label && (
                    <label htmlFor={id} className={labelClasses} style={labelStyle}>
                        {label}
                        {validationRules.required && <span className={styles.required}>*</span>}
                        {labelChild}
                    </label>
                )}
                <div className={styles.autoSuggestContainer}>
                    <input
                        ref={inputRef}
                        id={id}
                        type={type}
                        name={name}
                        value={inputValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowSuggestions(true)}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        className={`${styles.formControl} ${touched && error ? styles.inputError : ""}`}
                        style={inputStyle}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                        aria-expanded={showSuggestions}
                        aria-controls={`${id}-suggestions`}
                        aria-autocomplete="list"
                        {...restProps}
                    />

                    {showSuggestions && suggestions.length > 0 && (
                        <ul ref={suggestionsRef} className={styles.suggestionsList} id={`${id}-suggestions`} role="listbox" aria-label="Suggestions">
                            {isLoading ? (
                                <li className={styles.suggestionsLoading}>Loading...</li>
                            ) : (
                                suggestions.map((suggestion, index) => (
                                    <li
                                        key={`${suggestion}-${index}`}
                                        role="option"
                                        aria-selected={index === selectedIndex}
                                        className={`${styles.suggestionItem} ${index === selectedIndex ? styles.selected : ""}`}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                    >
                                        {suggestion}
                                    </li>
                                ))
                            )}
                        </ul>
                    )}
                </div>
                {contentChild}
            </div>

            {touched && error && (
                <div id={`${id}-error`} className={styles.errorText} role="alert">
                    {error}
                </div>
            )}

            {helperText && !error && <div className={styles.helperText}>{helperText}</div>}
            {infoText && <p className={styles.infoText}>{infoText}</p>}
        </div>
    );
};

export default React.memo(InputField);
