import { useParams, useRouter, useSearchParams } from "next/navigation";

const useModalHandler = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { permissionGroupId } = useParams();

    const modalType = searchParams.get("modal");
    const permissionId = searchParams.get("id");

    const closeModal = () => {
        const params = new URLSearchParams(window.location.search);
        params.delete("modal");
        params.delete("id");
        router.push(`/permission/${permissionGroupId}?${params.toString()}`, undefined, { shallow: true });
    };

    const setModalState = (modal, id) => {
        const params = new URLSearchParams(window.location.search);
        if (id) params.set("id", id);
        if (modal) params.set("modal", modal);
        router.push(`/permission/${permissionGroupId}?${params.toString()}`, undefined, { shallow: true });
    };

    return { modalType, permissionId, closeModal, setModalState };
};

export default useModalHandler;
