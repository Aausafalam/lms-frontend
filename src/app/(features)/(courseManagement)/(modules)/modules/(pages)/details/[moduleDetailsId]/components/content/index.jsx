import CourseLessons from "@/app/(features)/(courseManagement)/(modules)/lessons/page";
import { ModuleDetailPreview } from "../../../../form/components/preview/module-detail-preview";
import { sampleModuleData } from "../../../../form/utils/seeds";

const ModuleDetailsContent = ({ activeTab }) => {
    switch (activeTab) {
        case "overview":
            return <ModuleDetailPreview initialData={sampleModuleData} viewportWidth={1024} onDetailsPage={true} />;
        case "lessons":
            return <CourseLessons onModuleDetailsPage={true} />;
        case "assignments":
            return <div className="p-6">Assignments content will be displayed here</div>;
        case "quiz":
            return <div className="p-6">Quiz content will be displayed here</div>;
        default:
            return <ModuleDetailPreview data={sampleModuleData} viewportWidth={1024} onDetailsPage={true} />;
    }
};

export default ModuleDetailsContent;
