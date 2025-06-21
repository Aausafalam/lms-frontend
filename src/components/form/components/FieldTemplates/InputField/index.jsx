import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import "../../../styles/root.css";
import FormUtils from "@/components/form/utils";
import InputField from "@/components/ui/input";

const FormInputField = ({ formField, formValues, maskedValues, errors, ...restProps }) => {
    const {
        id,
        name,
        label,
        type = "text",
        placeholder = "",
        icon,

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
        showIndicator,

        // New auto-suggestion props
        autoSuggestion = {
            initialData: [],
            autoSuggestionUrl: "",
            minChars: 1,
            maxSuggestions: 10,
            debounceMs: 300,
        },
    } = formField;
    // Internal state
    const [inputValue, setInputValue] = useState(groupFieldDefaultValue || maskedValues?.[name] || value || "");
    const [error, setError] = useState("");
    const [touched, setTouched] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordError, setPasswordError] = useState("");

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
        if (autoSuggestion?.initialData?.length > 0) {
            setSuggestions(autoSuggestion.initialData);
        }
    }, [autoSuggestion.initialData]);

    // Update value when prop changes
    useEffect(() => {
        if (value !== undefined || maskedValues?.[name] !== undefined || groupFieldDefaultValue !== undefined) {
            setInputValue(groupFieldDefaultValue || maskedValues?.[name] || value);
        }
    }, [groupFieldDefaultValue || maskedValues?.[name] || value]);

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

    const getStrengthColor = () => {
        if (passwordStrength <= 1) return "bg-red-500";
        if (passwordStrength <= 3) return "bg-yellow-500";
        return "bg-green-500";
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

    const handlePasswordStrength = (password) => {
        if (!password) {
            setPasswordStrength(0);
            setPasswordError("");
            return;
        }

        let strength = 0;
        const feedback = [];

        // Length check
        if (password.length >= 8) {
            strength += 1;
        } else {
            feedback.push("Password should be at least 8 characters");
        }

        // Uppercase check
        if (/[A-Z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push("Add an uppercase letter");
        }

        // Lowercase check
        if (/[a-z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push("Add a lowercase letter");
        }

        // Number check
        if (/[0-9]/.test(password)) {
            strength += 1;
        } else {
            feedback.push("Add a number");
        }

        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        } else {
            feedback.push("Add a special character");
        }

        setPasswordStrength(strength);
        setPasswordError(feedback.join(", "));
    };

    useEffect(() => {
        handlePasswordStrength(inputValue);
    }, [inputValue]);

    return (
        <>
            <InputField
                id={id}
                name={name}
                type={type}
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                infoText={infoText}
                icon={icon}
                disabled={disabled}
                readOnly={readOnly}
                required={validationRules.required}
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error}
                touched={touched}
                className={formGroupClasses}
                suggestions={suggestions}
                isLoading={isLoading}
                showPasswordStrength={showIndicator}
                showPasswordToggle={type === "password"}
                maxLength={formField.maxLength}
            />
        </>
    );
};

export default React.memo(FormInputField);
