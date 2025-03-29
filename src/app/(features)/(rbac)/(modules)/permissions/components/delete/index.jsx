import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { usePermission } from "@/services/context/permission";

const DeletePermission = ({ modalState, permissionId, setRefreshTable, closeModal }) => {
    const { permissionDelete } = usePermission();

    useEffect(() => {
        if (modalState.delete && permissionId) {
            const deletePayload = {
                recordId: permissionId,
                onShowDetails: () => {},
                deleteAction: permissionDelete,
                toggleRefreshData: setRefreshTable,
            };
            GlobalUtils.handleDelete(deletePayload);
            closeModal();
        }
    }, [modalState.delete, permissionId]);

    return null;
};

export default DeletePermission;
