const DEFAULT_GRID = 1;

const InstructorsDetailsConfig = [
    {
        type: "select",
        multiple: true,
        name: "instructors",
        label: "Course Title",
        placeholder: "Select Instructors",
        validationRules: { required: true },
        validateOnChange: true,
        grid: DEFAULT_GRID,
        options: [
            { label: "Anuj Arya", value: "Id..........." },
            { label: "Aausaf alam", value: "ID........." },
        ],
        helperText: "Choose multiple instructors who will teach in this course",
    },
];

const response = {
    instructors: ["3245676"],
};

export default InstructorsDetailsConfig;
