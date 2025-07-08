"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import ModuleFormBase from "..";
import { useModule } from "@/services/context/module";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Edit Module Page Component
 * @description Page for editing existing modules
 */
const EditModule = () => {
    const { moduleId } = useParams();
    const { moduleDetails } = useModule();
    const { courseId } = useQueryParams();

    useEffect(() => {
        if (moduleId && moduleDetails.fetch) {
            moduleDetails.fetch({ dynamicRoute: `/${courseId}/module/${moduleId}` });
        }
    }, [moduleId]);

    if (moduleDetails.isLoading) {
        return (
            <div className="flex  items-center justify-center h-64">
                <LoadingSpinner size="lg" />
                <span className="ml-2">Loading module data...</span>
            </div>
        );
    }

    if (moduleDetails.error) {
        return <ErrorMessage title="Failed to load module" message={moduleDetails.error || "Unable to fetch module data"} onRetry={() => moduleDetails.fetch({ dynamicRoute: moduleId })} />;
    }

    if (!moduleDetails.data?.data) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Module data not found</p>
            </div>
        );
    }

    return <ModuleFormBase initialData={moduleDetails.data.data} moduleId={moduleId} />;
};

export default EditModule;
