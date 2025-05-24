const DEFAULT_GRID = 2;

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
        helperText: "Upload certificate template image (recommended size: 1000x700px, PNG or JPG format)",
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
        helperText: "Explain what the certificate represents and why it's valuable to students",
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
        helperText: "Enter each benefit on a new line (e.g., 'Add to your LinkedIn profile', 'Showcase your new skills')",
    },
];

const response = {
    certificateImage: "https://example.com/certificate.png",
    certificateDescription: "This is a sample certificate description.",
    certificateBenefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
};

export default CertificateDetailsConfig;
