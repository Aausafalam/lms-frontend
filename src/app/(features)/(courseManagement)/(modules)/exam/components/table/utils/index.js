import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import examTableConstants from "./constants";
import { List } from "lucide-react";

class ExamTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles, navigate, title, courseId }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name", "examCode"]);

        return {
            title: title,
            limit: examTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Exam",
                    onClick: () => navigate(`/exam/form/add?courseId=${courseId}`),
                },
                TableUtils.getExportButton({ url: "/exam" }),
                {
                    icon: <List />,
                    iconOnly: true,
                    onClick: () => navigate("/exam/form/add"),
                },
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Exams",
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
    static getTableActions({ data, setModalState, setSelectedExam, navigate }) {
        const handleAction = (row, actionType) => {
            const selectedExam = data?.records?.find((item) => row["id"] === item.id);

            if (actionType === "edit") {
                navigate(`/exam/form/${row["id"]}`);
            } else {
                setSelectedExam(selectedExam);
                setModalState(actionType, selectedExam.id);
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
    static handleRowClick({ row, data, setModalState, setSelectedExam }) {
        const selectedExam = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedExam(selectedExam);
        setModalState("view", selectedExam?.id);
    }
}

export default ExamTableUtils;
