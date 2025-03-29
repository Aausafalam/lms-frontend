"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const useNavigation = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const navigate = (path) => {
        const currentParams = new URLSearchParams(searchParams.toString()); // Get current query params
        const referralId = currentParams.get("ref"); // Extract referralId

        if (referralId) {
            const url = new URL(path, window.location.origin);
            url.searchParams.set("ref", referralId); // Append referralId to new path
            router.push(url.toString().replace(window.location.origin, ""));
        } else {
            router.push(path);
        }
    };

    return { navigate };
};
