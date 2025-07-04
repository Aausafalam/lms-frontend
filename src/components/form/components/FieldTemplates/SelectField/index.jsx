import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import CustomSelect from "../../SelectFieldType/Select";
import "../../../styles/root.css";
import FormUtils from "@/components/form/utils";
import apiClient from "@/services/api/config";
import GlobalUtils from "@/lib/utils";
import SelectField from "@/components/ui/select";

const FormSelectField = ({
    // Base props
    formField,
    formValues,
    dynamicOptions,
    errors,
    ...restProps
}) => {
    const {
        id,
        name,
        label,
        optionsUrl,
        type = "text",
        multiple,
        placeholder = "",
        clearOption = false,

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

        // Custom styling
        style = {},
        inputStyle = {},
        labelStyle = {},

        // Additional content
        labelChild,
        contentChild,
    } = formField;

    console.log(":optionsUrl>>>", optionsUrl);
    // Internal state
    const [inputValue, setInputValue] = useState(groupFieldDefaultValue || defaultValue || value || "");
    const [error, setError] = useState("");
    const [touched, setTouched] = useState(false);
    const [options, setOptions] = useState(formField.options || []);
    const [isLoading, setIsLoading] = useState(false);

    // Update value when prop changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        setInputValue(formValues?.[name]);
    }, [formValues?.[name]]);

    useEffect(() => {
        if (errors?.[name]) {
            setError(errors[name]);
            setTouched(true);
        }
    }, [errors?.[name]]);

    // Validation logic
    const validateInput = (valueToValidate) => {
        let validationError = FormUtils.validateField(valueToValidate, validationRules, formField);
        console.log("validationError", validationError);
        if (!validationError && customValidation) {
            validationError = customValidation(valueToValidate);
        }
        setError(validationError || null);
        return !validationError;
    };

    // Class names
    const formGroupClasses = `
    ${styles.formGroup}
    ${type ? styles[type] : ""}
    ${className}
    ${error ? styles.hasError : ""}
  `.trim();

    const labelClasses = `
    ${styles.label}
    ${labelClassName}
    ${error ? styles.inputError : ""}
  `.trim();

    const fetchOptionData = () => {
        setIsLoading(true);
        apiClient
            .get(optionsUrl.url)
            .then((response) => {
                if (response.data?.data?.records) {
                    setOptions(
                        response.data?.data?.records?.map((data) => ({ value: data?.[optionsUrl.valueKey || "id"], label: GlobalUtils.capitalizeEachWord(data?.[optionsUrl.labelKey || "name"]) }))
                    );
                } else {
                    setOptions(response.data?.data?.map((data) => ({ value: data?.[optionsUrl.valueKey || "id"], label: GlobalUtils.capitalizeEachWord(data?.[optionsUrl.labelKey || "name"]) })));
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // useEffect(() => {
    //     if (optionsUrl) {
    //         fetchOptionData();
    //     }
    // }, [optionsUrl]);
    console.log(formValues);
    return (
        <>
            <SelectField
                id={id}
                name={name}
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                infoText={infoText}
                icon={formField?.icon}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                value={inputValue}
                onChange={(event) => {
                    onChange(event);
                    customOnChange && customOnChange(event);
                    validateInput(event.target.value);
                }}
                onBlur={onBlur}
                error={error}
                touched={touched}
                className={formGroupClasses}
                options={dynamicOptions?.[name] || options}
                isLoading={isLoading}
                isMulti={multiple}
                isSearchable={formField?.isSearchable ? formField?.isSearchable : true}
                isClearable={formField?.isClearable ? formField?.isClearable : true}
                maxSelections={formField?.maxSelections}
                autoFocus={formField?.autoFocus}
                groupBy={formField?.groupBy}
                noOptionsMessage={formField?.noOptionsMessage}
                optionsUrl={optionsUrl}
            />
            {/* <div className={formGroupClasses} style={style}>
                <div className={styles.inputWrapper}>
                    {label && (
                        <label htmlFor={id} className={labelClasses} style={labelStyle}>
                            {label}
                            {validationRules.required && <span className={styles.required}>*</span>}
                            {labelChild}
                        </label>
                    )}
                    <CustomSelect
                        id={id}
                        defaultValue={formValues[name]}
                        name={name}
                        value={inputValue}
                        handleSelectChange={(event) => {
                            onChange(event);
                            customOnChange && customOnChange(event);
                            validateInput(event.target.value);
                        }}
                        options={dynamicOptions?.[name] || options}
                        disabled={disabled}
                        readOnly={readOnly}
                        multiple={multiple}
                        placeholder={placeholder}
                        classNames={[`${styles.formControl}`]}
                        style={inputStyle}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${id}-error` : undefined}
                        error={error}
                        type={type}
                        clearOption={clearOption}
                        {...restProps}
                    />

                    {contentChild}
                </div>

                {error && (
                    <div id={`${id}-error`} className={styles.errorText} role="alert">
                        {error}
                    </div>
                )}

                {helperText && !error && <div className={styles.helperText}>{helperText}</div>}

                {infoText && <p className={styles.infoText}>{infoText}</p>}
            </div> */}
        </>
    );
};

export default React.memo(FormSelectField);
