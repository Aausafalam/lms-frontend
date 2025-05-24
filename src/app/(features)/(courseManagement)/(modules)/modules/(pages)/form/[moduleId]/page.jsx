"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // or useRouter if using pages router
import ModuleFormBase from "..";
import { sampleCourseModule } from "../components/preview";

const EditModule = () => {
    const { moduleId } = useParams();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with actual data fetch
        async function fetchModuleData() {
            setLoading(true);
            try {
                // const res = await fetch(`/api/modules/${moduleId}`);
                // if (!res.ok) throw new Error("Failed to fetch module data");
                // const data = await res.json();
                const data = sampleCourseModule;
                setInitialData(data);
            } catch (error) {
                console.error(error);
                // handle error state
            } finally {
                setLoading(false);
            }
        }
        if (moduleId) {
            fetchModuleData();
        }
    }, [moduleId]);

    if (loading) return <div>Loading module data...</div>;
    if (!initialData) return <div>Module data not found.</div>;

    return <ModuleFormBase initialData={initialData} moduleId={moduleId} />;
};

export default EditModule;
