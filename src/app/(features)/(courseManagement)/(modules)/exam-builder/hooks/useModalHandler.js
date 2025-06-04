"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const useModalHandler = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const modalType = searchParams.get("modal");
    const lessonId = searchParams.get("id");
    const moduleId = searchParams.get("moduleId");
    const courseId = searchParams.get("courseId");

    const closeModal = () => {
        const params = new URLSearchParams(window.location.search);
        params.delete("modal");
        params.delete("id");
        params.delete("moduleId");
        params.delete("courseId");
        router.push(`/lessons?${params.toString()}`, undefined, { shallow: true });
    };

    const setModalState = (modal, id) => {
        const params = new URLSearchParams(window.location.search);
        if (id) params.set("id", id);
        if (modal) params.set("modal", modal);
        if (moduleId) params.set("moduleId", moduleId);
        if (courseId) params.set("courseId", courseId);
        router.push(`/lessons?${params.toString()}`, undefined, { shallow: true });
    };

    return { modalType, lessonId, closeModal, setModalState };
};

export default useModalHandler;
