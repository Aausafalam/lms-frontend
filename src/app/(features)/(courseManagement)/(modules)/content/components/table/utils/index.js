import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import contentsTableConstants from "./constants";
import GlobalUtils from "@/lib/utils";
import { List } from "lucide-react";

class ContentsTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles, navigate, title, courseId, moduleId, lessonId }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"]);

        return {
            title: lessonId ? "Content List" : title,
            limit: contentsTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Content",
                    onClick: () => navigate(`/content/form/add?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`),
                },
                TableUtils.getExportButton({ url: "/contents" }),
                {
                    icon: <List />,
                    iconOnly: true,
                    onClick: () => navigate("/contents/form/add"),
                },
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Contents ",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
            ],
        };
    }

    /**
     * Returns available actions for each row.
     */
    static getTableActions({ data, setModalState, setSelectedContent, navigate, courseId, moduleId, lessonId }) {
        const handleAction = (row, actionType) => {
            const selectedContents = data?.records?.find((item) => row["id"] === item.id);

            if (actionType === "edit") {
                navigate(`/contents/form/${row["id"]}?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`);
            } else {
                setSelectedContent(selectedContents);
                setModalState(actionType, selectedContents.id);
            }
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
    static handleRowClick({ row, data, setModalState, setSelectedContent }) {
        const selectedContents = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedContent(selectedContents);
        setModalState("view", selectedContents.id);
    }
}

export default ContentsTableUtils;
