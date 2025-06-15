import ModuleContent from "@/app/(features)/(courseManagement)/(modules)/videos/page";
import { sampleModuleData } from "../../../../form/utils/seeds";
import { ModuleDetailPreview } from "../../../../form/components/preview/module-detail-preview";
import CourseLessons from "@/app/(features)/(courseManagement)/(modules)/lessons/page";

const ModuleDetailsContent = ({ activeTab }) => {
    switch (activeTab) {
        case "overview":
            return <ModuleDetailPreview initialData={sampleModuleData} viewportWidth={1024} onDetailsPage={true} />;
        case "content":
            return <ModuleContent />;
        case "lessons":
            return <CourseLessons onModuleDetailsPage={true} />;
        case "assignments":
            return <div className="p-6 text-center text-gray-500">Assignments content will be displayed here</div>;
        case "quiz":
            return <div className="p-6 text-center text-gray-500">Quiz content will be displayed here</div>;
        default:
            return <ModuleDetailPreview initialData={sampleModuleData} viewportWidth={1024} onDetailsPage={true} />;
    }
};

export default ModuleDetailsContent;
