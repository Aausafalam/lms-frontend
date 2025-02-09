import TableUtils from "@/components/table/utils";
import categoryTableConstants from "./constants";
import TableIcon from "@/components/table/utils/icon";
import UserAvatar from "@/components/UserAvatar";
import GlobalUtils from "@/lib/utils";
import styles from "../styles/index.module.css";

class CategoryTableUtils {
    static tableHeader({ data, setShow, styles }) {
        const autoSuggestionData = TableUtils.formatDataForAutoSuggestion(data.data || [], ["name", "code"]);
        return {
            limit: categoryTableConstants.TABLE_LIMITS,
            actionButtons: [
                {
                    variant: "primary",
                    icon: TableIcon.PLUS,
                    label: "Add New Category",
                    onClick: () => setShow({ add: true }),
                },
                {
                    variant: "secondary",
                    flat: true,
                    className: styles.export,
                    icon: TableIcon.EXPORT,
                    label: "Export",
                    onClick: () => console.log("Exporting data..."),
                },
            ],
            filters: [
                {
                    type: "text",
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Category",
                    autoSuggestion: {
                        initialData: autoSuggestionData,
                        autoSuggestionUrl: "/api/suggestions",
                        minChars: 1,
                        maxSuggestions: 5,
                    },
                    className: styles.search_field,
                },
            ],
        };
    }

    static tableRow(data = { data: [] }) {
        return data?.data?.map((item) => {
            const status = item.isActive ? "Active" : "Inactive";
            return {
                Id: { key: "id", value: item.id, type: "hidden" },
                Category: {
                    key: "name",
                    value: item.name,
                },
                "Category Code": { key: "code", value: item.code },
                "Display Order": { key: "displayOrder", value: item.displayOrder },
                Status: { key: "isActive", value: <span className={styles[status]}>{status}</span> },
                Description: { key: "description", value: item.description },
            };
        });
    }
    static tableActionData({ data, setShow, setDetails }) {
        const handleAction = (row, key) => {
            setDetails(data?.data?.find((item) => row["Id"].value === item.id));
            setShow({ [key]: true });
        };

        return [
            {
                name: "Delete",
                functions: (row) => handleAction(row, "delete"),
                label: "Delete Entry",
            },
            {
                name: "View",
                functions: (row) => handleAction(row, "view"),
                label: "View Details",
            },
            {
                name: "Edit",
                functions: (row) => handleAction(row, "edit"),
                label: "Edit Details",
            },
        ];
    }
}
export default CategoryTableUtils;
