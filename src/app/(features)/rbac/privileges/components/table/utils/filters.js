const FILTER_OPTIONS = {
    privilegeGroupId: {
        type: "select",
        grid: 2,
        optionsUrl: {
            url: "/privilege-group?responseType=dropdown",
        },
        placeholder: "Filter by Group",
    },
    // isActive: {
    //   type: "select",
    //   grid: 2,
    //   options: [
    //     { label: "Active", value: true },
    //     { label: "Inactive", value: false },
    //   ],
    //   placeholder: "Filter by Status",
    // },
};

export default FILTER_OPTIONS;
