import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import "../../../styles/root.css";
import FormUtils from "@/components/form/utils";
import CkEditor from "./components/ckeEditor";
import TextareaField from "@/components/ui/textarea";

const FormTextAreaField = ({
    // Base props
    formField,
    formValues,
    errors,
    ...restProps
}) => {
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

        // Custom styling
        style = {},
        inputStyle = {},
        labelStyle = {},

        // Additional content
        labelChild,
        contentChild,
        editorType,
    } = formField;
    // Internal state
    const [inputValue, setInputValue] = useState(groupFieldDefaultValue || defaultValue || value || "");
    const [error, setError] = useState("");
    const [touched, setTouched] = useState(false);

    // Update value when prop changes
    useEffect(() => {
        if (value !== undefined || groupFieldDefaultValue !== undefined || formValues[name] !== undefined) {
            setInputValue(formValues[name] || groupFieldDefaultValue || value);
        }
    }, [groupFieldDefaultValue, value, formValues[name]]);

    useEffect(() => {
        setInputValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        if (errors?.[name]) {
            setError(errors[name]);
            setTouched(true);
        }
    }, [errors?.[name]]);

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

        if (validateOnChange) {
            validateInput(newValue);
        }

        if (onChange) {
            onChange(e);
        }
    };

    const handleBlur = (e) => {
        setTouched(true);
        console.log(e);
        // if (validateOnBlur) {
        //     validateInput(e.target.value);
        // }

        // if (onBlur) {
        //     onBlur(e);
        // }
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

    const Comp = editorType === "rich" ? CkEditor : "textarea";

    return (
        <>
            {/* <div className={formGroupClasses} style={style}>
                <div className={styles.inputWrapper}>
                    {label && (
                        <label htmlFor={id} className={labelClasses} style={labelStyle}>
                            {label}
                            {validationRules.required && <span className={styles.required}>*</span>}
                            {labelChild}
                        </label>
                    )}
                    <Comp
                        id={id}
                        type={type}
                        name={name}
                        value={inputValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        className={`${styles.formControl} ${touched && error ? styles.inputError : ""}`}
                        style={inputStyle}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                        {...restProps}
                    ></Comp>

                    {contentChild}
                </div>

                {touched && error && (
                    <div id={`${id}-error`} className={styles.errorText} role="alert">
                        {error}
                    </div>
                )}

                {helperText && !error && <div className={styles.helperText}>{helperText}</div>}

                {infoText && <p className={styles.infoText}>{infoText}</p>}
            </div> */}

            <TextareaField
                id={id}
                type={type}
                name={name}
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                infoText={infoText}
                icon={formField.icon}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error}
                touched={touched}
                className={formGroupClasses}
                maxLength={formField.maxLength}
                maxWords={formField.maxWords}
                minRows={formField.minRows}
                maxRows={formField.maxRows}
                autoResize={formField.autoResize ? formField.autoResize : true}
                showWordCount={formField.showWordCount ? formField?.showWordCount : true}
                spellCheck={formField.spellCheck ? formField.spellCheck : true}
                autoFocus={formField?.autoFocus}
                style={inputStyle}
                {...restProps}
            />
        </>
    );
};

export default React.memo(FormTextAreaField);
