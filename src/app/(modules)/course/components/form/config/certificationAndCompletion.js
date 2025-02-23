import GlobalICONS from "@/lib/utils/icons";
import courseFormConstants from "../utils/constants";

const DEFAULT_GRID = 3;

const certificationAndCompletionSection = [
    {
        type: "rowHeader",
        label: "Certification & Completion",
        icon: GlobalICONS.CERTIFICATE,
        description: "Specify whether this course provides a certificate upon completion and define the criteria for earning it.",
    },
    {
        type: "select",
        name: "hasCertificate",
        label: "Has Certificate",
        grid: DEFAULT_GRID,
        options: courseFormConstants.hasCertificateOptions,
        placeholder: "Select certificate availability",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "textarea",
        name: "certificateCriteria",
        label: "Certificate Criteria",
        grid: 1,
        placeholder: "Define certificate eligibility criteria...",
        editorType: "rich",
        validationRules: { required: false },
        validateOnChange: true,
    },
];

export default certificationAndCompletionSection;
