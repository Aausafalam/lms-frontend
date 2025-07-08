"use client";

import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useModule } from "@/services/context/module";
import { toast } from "@/components/ui/toast";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Delete Module Component
 * @description Handles module deletion with confirmation
 */
const DeleteModule = ({ modalState, moduleId, setRefreshTable, closeModal }) => {
    const { moduleDelete } = useModule();
    const { courseId: courseIdByParams } = useParams();
    const { courseId: courseIdByQuery } = useQueryParams();
    const courseId = courseIdByParams || courseIdByQuery;
    useEffect(() => {
        if (modalState.delete && moduleId) {
            try {
                const deletePayload = {
                    recordId: `/${courseId}/module/${moduleId}`,
                    onShowDetails: closeModal,
                    deleteAction: moduleDelete,
                    toggleRefreshData: () => setRefreshTable(),
                    onSuccess: () => {
                        toast.success("Module deleted successfully");
                    },
                    onError: (error) => {
                        toast.error(error?.message || "Failed to delete module");
                    },
                };

                GlobalUtils.handleDelete(deletePayload);
            } catch (error) {
                console.error("Error deleting module:", error);
                toast.error("An error occurred while deleting the module");
                closeModal();
            }
        }
    }, [modalState.delete, moduleId, moduleDelete, closeModal, setRefreshTable]);

    return null;
};

export default DeleteModule;
