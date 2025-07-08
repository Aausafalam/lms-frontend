"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import ModuleFormBase from "..";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Add Module Page Component
 * @description Page for creating new modules
 */
const AddModule = () => {
    const { initialData } = useQueryParams();

    let parsedData = {};

    if (initialData) {
        try {
            parsedData = JSON.parse(decodeURIComponent(initialData));
        } catch (error) {
            console.error("Error parsing initial data:", error);
        }
    }

    return (
        <ErrorBoundary>
            <ModuleFormBase initialData={parsedData} />
        </ErrorBoundary>
    );
};

export default AddModule;
