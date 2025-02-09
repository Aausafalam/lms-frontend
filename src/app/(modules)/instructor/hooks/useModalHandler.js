import { useRouter, useSearchParams } from "next/navigation";

const useModalHandler = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const modalType = searchParams.get("modal");
    const instructorId = searchParams.get("id");

    const closeModal = () => {
        const params = new URLSearchParams(window.location.search);
        params.delete("modal");
        params.delete("id");
        router.push(`/instructor?${params.toString()}`, undefined, { shallow: true });
    };

    const setModalState = (modal, id) => {
        const params = new URLSearchParams(window.location.search);
        if (id) params.set("id", id);
        if (modal) params.set("modal", modal);
        router.push(`/instructor?${params.toString()}`, undefined, { shallow: true });
    };

    return { modalType, instructorId, closeModal, setModalState };
};

export default useModalHandler;
