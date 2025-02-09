import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useInstructor } from "@/services/context/instructor";

const DeleteInstructor = ({ modalState, instructorId, setRefreshTable, closeModal }) => {
    const { instructorDelete } = useInstructor();

    useEffect(() => {
        if (modalState.delete && instructorId) {
            const deletePayload = {
                recordId: instructorId,
                onShowDetails: () => {},
                deleteAction: instructorDelete,
                toggleRefreshData: setRefreshTable,
            };
            GlobalUtils.handleDelete(deletePayload);
            closeModal();
        }
    }, [modalState.delete, instructorId]);

    return null;
};

export default DeleteInstructor;
