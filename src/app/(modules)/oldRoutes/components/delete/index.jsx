import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useRoutes } from "@/services/context/routes";

const DeleteRoutes = ({ modalState, routesId, setRefreshTable, closeModal }) => {
    const { routesDelete } = useRoutes();

    useEffect(() => {
        if (modalState.delete && routesId) {
            const deletePayload = {
                recordId: routesId,
                onShowDetails: () => {},
                deleteAction: routesDelete,
                toggleRefreshData: setRefreshTable,
            };
            GlobalUtils.handleDelete(deletePayload);
            closeModal();
        }
    }, [modalState.delete, routesId]);

    return null;
};

export default DeleteRoutes;
