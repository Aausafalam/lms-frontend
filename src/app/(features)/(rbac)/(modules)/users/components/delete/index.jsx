import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useUsers } from "@/services/context/users";

const DeleteUsers = ({ modalState, usersId, setRefreshTable, closeModal }) => {
    const { usersDelete } = useUsers();

    useEffect(() => {
        if (modalState.delete && usersId) {
            const deletePayload = {
                recordId: usersId,
                onShowDetails: () => {},
                deleteAction: usersDelete,
                toggleRefreshData: setRefreshTable,
            };
            GlobalUtils.handleDelete(deletePayload);
            closeModal();
        }
    }, [modalState.delete, usersId]);

    return null;
};

export default DeleteUsers;
