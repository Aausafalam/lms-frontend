"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const useModalHandler = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const modalType = searchParams.get("modal");
    const contentId = searchParams.get("id");
    const moduleId = searchParams.get("moduleId");
    const courseId = searchParams.get("courseId");
    const lessonId = searchParams.get("lessonsId");

    const closeModal = () => {
        const params = new URLSearchParams(window.location.search);
        params.delete("modal");
        params.delete("id");
        params.delete("moduleId");
        params.delete("courseId");
        params.delete("lessonId");
        router.push(`/contents?${params.toString()}`, undefined, { shallow: true });
    };

    const setModalState = (modal, id) => {
        const params = new URLSearchParams(window.location.search);
        if (id) params.set("id", id);
        if (modal) params.set("modal", modal);
        if (moduleId) params.set("moduleId", moduleId);
        if (courseId) params.set("courseId", courseId);
        if (lessonId) params.set("lessonId", lessonId);
        router.push(`/contents?${params.toString()}`, undefined, { shallow: true });
    };

    return { modalType, contentId, closeModal, setModalState };
};

export default useModalHandler;
