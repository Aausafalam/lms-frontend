"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ModuleFormBase from "..";
import { sampleModuleData } from "../utils/seeds";
import { useModuleGetDetails } from "@/services/hooks/module";
import { useQueryParams } from "@/lib/hooks/useQuery";

const EditModule = () => {
    const { moduleId } = useParams();
    const { moduleDetails } = useModuleGetDetails();
    const { courseId } = useQueryParams();
    const data = moduleDetails?.data;
    useEffect(() => {
        if (moduleId && courseId) {
            moduleDetails.fetch?.({
                dynamicRoute: `/${courseId}/module/${moduleId}`,
            });
        }
    }, [moduleId, courseId]);

    if (moduleDetails.isLoading) return <div className="flex items-center justify-center h-64">Loading module data...</div>;
    if (!data) return <div className="flex items-center justify-center h-64">Module data not found.</div>;

    return <ModuleFormBase initialData={data} moduleId={moduleId} />;
};

export default EditModule;
