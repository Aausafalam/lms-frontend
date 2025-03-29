import { useRouter, useSearchParams } from "next/navigation";

const useModalHandler = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const modalType = searchParams.get("modal");
    const permissionGroupId = searchParams.get("id");

    const closeModal = () => {
        const params = new URLSearchParams(window.location.search);
        params.delete("modal");
        params.delete("id");
        router.push(`/permissions-group?${params.toString()}`, undefined, { shallow: true });
    };

    const setModalState = (modal, id) => {
        const params = new URLSearchParams(window.location.search);
        if (id) params.set("id", id);
        if (modal) params.set("modal", modal);
        router.push(`/permissions-group?${params.toString()}`, undefined, { shallow: true });
    };

    return { modalType, permissionGroupId, closeModal, setModalState };
};

export default useModalHandler;
