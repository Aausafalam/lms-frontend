const samplePermissionTableData = {
    totalPages: 10,
    totalDocuments: 100,
    data: [
        {
            name: "createUser",
            createdAt: "14 Apr 2021, 8:43 PM",
            routes: ["Administrator"],
            description: "User related operations like create and update users",
        },
        {
            name: "updateUser",
            createdAt: "16 Sep 2021, 5:20 PM",
            routes: ["Administrator"],
            description: "User related operations like create and update users",
        },
        {
            name: "deleteUser",
            createdAt: "14 Oct 2021, 10:20 AM",
            routes: ["Administrator", "Manager"],
            description: "User related operations like create and update users",
        },
        {
            name: "projectPlanning",
            createdAt: "14 Oct 2021, 10:20 AM",
            routes: ["Administrator", "Users", "Support"],
            description: "User related operations like create and update users",
        },
        {
            name: "manageEmailSequences",
            createdAt: "23 Aug 2021, 2:00 PM",
            routes: ["Administrator", "Users", "Support"],
            description: "User related operations like create and update users",
        },
        {
            name: "clientCommunication",
            createdAt: "15 Apr 2021, 11:30 AM",
            routes: ["Administrator", "Manager"],
            description: "User related operations like create and update users",
        },
        {
            name: "viewUser",
            createdAt: "04 Dec 2021, 8:15 PM",
            routes: ["Administrator", "Restricted User"],
        },
        {
            name: "financialManagement",
            createdAt: "25 Feb 2021, 10:30 AM",
            routes: ["Administrator", "Manager"],
        },
        {
            name: "manageUserTasks",
            createdAt: "04 Nov 2021, 11:45 AM",
            routes: ["Administrator", "Support"],
        },
    ],
};

export default samplePermissionTableData;
