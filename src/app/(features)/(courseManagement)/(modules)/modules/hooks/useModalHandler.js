"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const useModalHandler = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const modalType = searchParams.get("modal");
    const moduleId = searchParams.get("id");

    const closeModal = () => {
        const params = new URLSearchParams(window.location.search);
        params.delete("modal");
        params.delete("id");
        router.push(`/modules?${params.toString()}`, undefined, { shallow: true });
    };

    const setModalState = (modal, id) => {
        const params = new URLSearchParams(window.location.search);
        if (id) params.set("id", id);
        if (modal) params.set("modal", modal);
        router.push(`/modules?${params.toString()}`, undefined, { shallow: true });
    };

    return { modalType, moduleId, closeModal, setModalState };
};

export default useModalHandler;
