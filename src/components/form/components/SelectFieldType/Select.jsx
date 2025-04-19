import React from "react";
import Select, { components } from "react-select";
import chroma from "chroma-js";
const DropdownIndicator = (props) => {
    if (props.selectProps.isDisabled) {
        return null;
    }

    return <components.DropdownIndicator {...props} />;
};

const MultiValueRemove = (props) => {
    if (props.selectProps.isDisabled) {
        return null;
    }

    return <components.MultiValueRemove {...props} />;
};

const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: "block",
        marginRight: 8,
        height: 10,
        width: 10,
    },
});

const colorStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isDisabled ? undefined : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : undefined,
            color: isDisabled ? "#ccc" : isSelected ? (chroma.contrast(color, "white") > 2 ? "white" : "black") : data.color,
            cursor: isDisabled ? "not-allowed" : "default",

            ":active": {
                ...styles[":active"],
                backgroundColor: !isDisabled ? (isSelected ? data.color : color.alpha(0.3).css()) : undefined,
            },
        };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const CustomSingleValue = (props) => <components.SingleValue {...props}>{props.isDisabled ? <span>{props.data.label}</span> : props.children}</components.SingleValue>;

const CustomMultiValueLabel = (props) => <components.MultiValueLabel {...props}>{props.data.disabled ? <span>{props.data.label}</span> : props.children}</components.MultiValueLabel>;
const getStyles = (style, error) => {
    let styles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--initial-field-background-color)",
            textAlign: "left",
            color: "red",
            fontSize: "var(--input-font-size)",
            borderColor: error ? "var(--error-color)" : state.isFocused ? "var(--active-border-color)" : "var(--initial-border-color)",
            boxShadow: state.isFocused && error ? "0 0 0 1px var(--error-color)" : state.isFocused ? `0 0 0 1px var(--active-border-color)` : "none",
            "&:hover": {
                borderColor: error ? "0" : state.isFocused ? "" : "var(--hover-border-color)",
            },
            "&:focus": {
                borderColor: error ? "0px" : "var(--active-border-color)",
            },
            border: state.isFocused && error ? "" : error ? "2px solid var(--error-color)" : "",
            paddingBlock: "0.1rem",
            paddingInline: "0.15rem",
            borderRadius: "var(--field-border-radius)",
            fontWeight: "400",
        }),
        menu: (provided) => ({
            ...provided,
            textAlign: "left",
            fontSize: "var(--input-font-size)",
            boxShadow: "0 2px 8px rgba(var(--text-primary), 0.12), 0 0 transparent, 0 0 transparent;",
            backgroundColor: "white",
            padding: "0.45rem",
            paddingRight: "0.25rem",
            paddingTop: "0.25rem",
            border: "none",
            borderRadius: "0.4rem",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "rgb(var(--theme-primary), .15)" : state.isFocused ? "#f5f5f5" : "white",
            color: state.isSelected ? "var(--active-color)" : "var( --initial-color)",
            fontSize: "var(--input-font-size)",
            padding: "0.55rem 0.75rem",
            cursor: "pointer",
            borderRadius: "0.37rem",
            letterSpacing: "0.25px",
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "var(--active-color)",
            color: "white",
            borderRadius: "5px",
            paddingInline: "0.5rem",
            fontSize: "var(--input-font-size)", // Add font size
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: "white",
            fontSize: "var(--input-font-size)", // Add font size
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "var(--placeholder-color)",
            fontWeight: "var(--placeholder-font-weight)",
            fontSize: "var(--placeholder-font-size)",
        }),
        ...style,
    };

    if (style?.color) {
        styles = { ...styles, ...colorStyles };
    }
    return styles;
};

const CustomSelect = ({ name, formValues, handleSelectChange, options, multiple, required, disabled, style = {}, classNames = [], error, placeholder, type, clearOption, value }) => (
    <Select
        id={name}
        name={name}
        value={
            multiple
                ? options.filter((option) => formValues?.[name]?.includes(option.value) || value?.includes(option.value))
                : options.find((option) => option.value === formValues?.[name] || option.value === value)
        }
        onChange={(selectedOption) => handleSelectChange({ target: { name, value: multiple ? selectedOption.map((opt) => opt.value) : selectedOption?.value } })}
        options={options}
        isMulti={multiple}
        required={required || false}
        isDisabled={disabled}
        components={{
            DropdownIndicator,
            MultiValueRemove,
            SingleValue: CustomSingleValue,
            MultiValueLabel: CustomMultiValueLabel,
        }}
        styles={getStyles(style, error)}
        placeholder={placeholder}
        instanceId="my-select"
        className={["react-select-container", ...classNames].join(" ")}
        isClearable={clearOption}
    />
);

export default CustomSelect;
