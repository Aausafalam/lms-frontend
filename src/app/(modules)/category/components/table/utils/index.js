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
            item.categoryDetails = {
                name: item.code,
                image: item.iconUrl || "https://demos.pixinvent.com/vuexy-vuejs-laravel-admin-template/demo-1/build/assets/avatar-1-DMk2FF1-.png",
                email: item.name,
                id: item.id,
            };
            const status = item.isActive ? "Active" : "Inactive";
            return {
                Id: { key: "id", value: item.id, type: "hidden" },
                Category: {
                    key: "name",
                    value: <UserAvatar userDetails={item.categoryDetails} />,
                    originalValue: GlobalUtils.capitalizeEachWord(item.userDetails?.name) || "",
                    suggestionValue: GlobalUtils.capitalizeEachWord(item.userDetails?.name) || "",
                },
                "Category Code": { key: "code", value: item.code },
                "Display Order": { key: "displayOrder", value: item.displayOrder },
                Status: { key: "isActive", value: <span className={styles[status]}>{status}</span> },
                Description: { key: "description", value: item.description },
            };
        });
    }
    static tableActionData({ data, setShow, setCategoryDetails }) {
        const handleAction = (row, key) => {
            setCategoryDetails(data?.data?.find((item) => row["Id"].value === item.id));
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

    static tablePagination(data) {
        return {
            totalPage: data.totalPages || "0",
            totalItemCount: data.totalDocuments || "0",
        };
    }
}
export default CategoryTableUtils;
