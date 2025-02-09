import GlobalICONS from "@/lib/utils/icons";

const DEFAULT_GRID = 3;

const socialProfilesSection = [
    {
        type: "rowHeader",
        label: "Social Profiles",
        icon: GlobalICONS.SOCIAL,
        description: "Provide links to the instructor's social media profiles to help connect and engage with them online.",
    },
    {
        type: "text",
        name: "linkedin",
        label: "LinkedIn Profile Link",
        grid: DEFAULT_GRID,
        placeholder: "Enter instructor LinkedIn profile link",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "text",
        name: "facebook",
        label: "Facebook Profile Link",
        grid: DEFAULT_GRID,
        placeholder: "Enter instructor Facebook profile link",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "text",
        name: "twitter",
        label: "Twitter Profile Link",
        grid: DEFAULT_GRID,
        placeholder: "Enter instructor Twitter profile link",
        validationRules: { required: true },
        validateOnChange: true,
    },
];

export default socialProfilesSection;
