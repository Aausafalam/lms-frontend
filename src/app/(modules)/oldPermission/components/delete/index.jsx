import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { usePermissionGroup } from "@/services/context/permissionGroup";

const DeletePermissionGroup = ({ modalState, permissionGroupId, setRefreshTable, closeModal }) => {
    const { permissionGroupDelete } = usePermissionGroup();

    useEffect(() => {
        if (modalState.delete && permissionGroupId) {
            const deletePayload = {
                recordId: permissionGroupId,
                onShowDetails: () => {},
                deleteAction: permissionGroupDelete,
                toggleRefreshData: setRefreshTable,
            };
            GlobalUtils.handleDelete(deletePayload);
            closeModal();
        }
    }, [modalState.delete, permissionGroupId]);

    return null;
};

export default DeletePermissionGroup;
