const DEFAULT_GRID = 1;

const CertificateDetailsConfig = [
    {
        type: "file",
        name: "certificateImage",
        label: "Certificate Image Upload",
        grid: DEFAULT_GRID,
        placeholder: "Upload certificate template image",
        validationRules: { required: true },
        validateOnChange: true,
        accept: ["image"],
    },
    {
        type: "textarea",
        name: "certificateDescription",
        label: "Certificate Description",
        grid: DEFAULT_GRID,
        placeholder: "Describe the certificate and its value",
        validationRules: { required: true },
        validateOnChange: true,
        rows: 4,
    },
    {
        type: "textarea",
        name: "certificateBenefits",
        label: "Certificate Benefits (One per line)",
        grid: DEFAULT_GRID,
        placeholder: "List certificate benefits (one per line)",
        validationRules: { required: true },
        validateOnChange: true,
        rows: 5,
        helperText: "Enter each benefit on a new line",
    },
];

export default CertificateDetailsConfig;
