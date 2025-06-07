import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import examPatternTableConstants from "./constants";
import { List } from "lucide-react";

class ExamPatternTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles, navigate, title }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"]);

        return {
            title: title,
            limit: examPatternTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Exam Pattern",
                    onClick: () => navigate(`/exam-pattern/form/add`),
                },
                TableUtils.getExportButton({ url: "/exam-pattern" }),
                {
                    icon: <List />,
                    iconOnly: true,
                    onClick: () => navigate("/exam-pattern/form/add"),
                },
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Exam Pattern ",
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
    static getTableActions({ data, setModalState, setSelectedExamPattern, navigate }) {
        const handleAction = (row, actionType) => {
            const selectedExamPattern = data?.records?.find((item) => row["id"] === item.id);

            if (actionType === "edit") {
                navigate(`/exam-pattern/form/${row["id"]}`);
            } else {
                setSelectedExamPattern(selectedExamPattern);
                setModalState(actionType, selectedExamPattern.id);
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
    static handleRowClick({ row, data, setModalState, setSelectedExamPattern }) {
        const selectedExamPattern = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedExamPattern(selectedExamPattern);
        setModalState("view", selectedExamPattern?.id);
    }
}

export default ExamPatternTableUtils;
