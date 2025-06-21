const FILTER_OPTIONS = {
  method: {
    type: "select",
    grid: 3,
    options: [
      { label: "GET", value: "GET" },
      { label: "POST", value: "POST" },
      { label: "PUT", value: "PUT" },
      { label: "DELETE", value: "DELETE" },
      { label: "PATCH", value: "PATCH" },
    ],
    placeholder: "Filter by Method",
  },
  // type: {
  //   type: "select",
  //   grid: 2,
  //   options: [
  //     { label: "API", value: "API" },
  //     { label: "WEB", value: "WEB" },
  //     { label: "WEBHOOK", value: "WEBHOOK" },
  //   ],
  //   placeholder: "Filter by Type",
  // },
  isPublic: {
    type: "select",
    grid: 3,
    options: [
      { label: "Public", value: true },
      { label: "Protected", value: false },
    ],
    placeholder: "Filter by Access",
  },
}

export default FILTER_OPTIONS
