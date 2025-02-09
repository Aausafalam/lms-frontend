import GlobalICONS from "@/lib/utils/icons";

const mediaAndContentDetailsSection = [
    {
        type: "rowHeader",
        label: "Media & Content Details",
        icon: GlobalICONS.MEDIA,
        description: "Upload media files such as course thumbnails, promo videos, and provide the syllabus details.",
    },
    {
        type: "file",
        name: "thumbnailUrl",
        label: "Thumbnail",
        grid: 2,
        placeholder: "Upload course thumbnail",
        url: "/course/thumbnail/upload",
        accept: ["image"],
        multiple: false,
        validationRules: { required: false },
        validateOnChange: true,
    },
    {
        type: "file",
        name: "promoVideoUrl",
        label: "Promo Video",
        grid: 2,
        placeholder: "Upload course promo video",
        url: "/course/promoVideo/upload",
        accept: ["video"],
        multiple: false,
        validationRules: { required: false },
        validateOnChange: true,
    },
    {
        type: "textarea",
        name: "syllabus",
        label: "Syllabus",
        grid: 1,
        placeholder: "Write the course syllabus...",
        validationRules: { required: false },
        validateOnChange: true,
    },
];

export default mediaAndContentDetailsSection;
