import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import videosTableConstants from "./constants";
import { List } from "lucide-react";

class VideosTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles, navigate, title, courseId, moduleId, lessonId }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"]);

        return {
            title: lessonId ? "Video List" : title,
            limit: videosTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Video",
                    onClick: () => navigate(`/videos/form/add?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`),
                },
                TableUtils.getExportButton({ url: "/videos" }),
                {
                    icon: <List />,
                    iconOnly: true,
                    onClick: () => navigate("/videos/form/add"),
                },
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Videos ",
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
            const selectedVideos = data?.records?.find((item) => row["id"] === item.id);

            if (actionType === "edit") {
                navigate(`/videos/form/${row["id"]}?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`);
            } else {
                setSelectedContent(selectedVideos);
                setModalState(actionType, selectedVideos.id);
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
    static handleRowClick({ row, data, setModalState, setSelectedVideo }) {
        const selectedVideos = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedVideo(selectedVideos);
        setModalState("view", selectedVideos.id);
    }
}

export default VideosTableUtils;
