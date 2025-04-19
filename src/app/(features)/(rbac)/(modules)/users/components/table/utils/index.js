import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import usersTableConstants from "./constants";
import GlobalUtils from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import UsersICONS from "./icons";

class UsersTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles, view }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"]);

        return {
            limit: usersTableConstants.LIMITS,
            actionButtons: [
                view !== "roles" && {
                    icon: TableIcon.PLUS,
                    label: "New Users",
                    onClick: () => setModalState("add"),
                },
                TableUtils.getExportButton({ url: "/users" }),
            ].filter(Boolean),
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Users ",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
            ],
        };
    }

    /**
     * Generates table rows based on users data.
     */
    static getTableRows({ data = { data: [] }, styles }) {
        return data?.records?.map((user) => {
            user.userDetails = {
                name: user.name,
                image: user.image,
                email: user.email,
                _id: user._id,
            };
            return {
                Id: { key: "id", value: user._id, type: "hidden" },
                User: {
                    key: "name",
                    value: <UserAvatar userDetails={user.userDetails} />,
                    originalValue: GlobalUtils.capitalizeEachWord(user.userDetails?.name) || "",
                    suggestionValue: GlobalUtils.capitalizeEachWord(user.userDetails?.name) || "",
                },
                Role: {
                    key: "role",
                    value: (
                        <p className={styles.role}>
                            <span className={styles[user.role?.toLowerCase()]}>{UsersICONS?.[user.role?.toUpperCase()]}</span>
                            <span>{user.role}</span>
                        </p>
                    ),
                },
                Plan: { key: "plan", value: user.plan },
                billing: { key: "billing", value: <span className={styles.billing}>{user.billing}</span> },
                status: { key: "status", value: <span className={`${styles.status} ${styles[user.status]}`}>{user.status}</span> },
            };
        });
    }

    /**
     * Returns available actions for each row.
     */
    static getTableActions({ data, setModalState, setSelectedUsers }) {
        const handleAction = (row, actionType) => {
            const selectedUsers = data?.records?.find((item) => row["id"].value === item.id);
            setSelectedUsers(selectedUsers);
            setModalState(actionType, selectedUsers.id);
        };

        return [
            { name: "Delete", functions: (row) => handleAction(row, "delete"), label: "Delete Entry" },
            { name: "View", functions: (row) => handleAction(row, "view"), label: "View Details" },
            { name: "Edit", functions: (row) => handleAction(row, "edit"), label: "Edit Details" },
        ];
    }

    /**
     * Handles row click actions.
     */
    static handleRowClick({ row, data, setModalState, setSelectedUsers }) {
        const selectedUsers = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedUsers(selectedUsers);
        setModalState("view", selectedUsers.id);
    }
}

export default UsersTableUtils;
