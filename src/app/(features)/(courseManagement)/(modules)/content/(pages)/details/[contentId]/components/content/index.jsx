import { ContentDetailPreview } from "../../../../form/components/preview/content-detail-preview";
import { sampleContentData } from "../../../../form/utils/seeds";

const ContentDetailsView = ({ activeTab }) => {
    switch (activeTab) {
        case "overview":
            return <ContentDetailPreview initialData={sampleContentData} viewportWidth={1024} onDetailsPage={true} />;
        case "quiz":
            return <div className="p-6">Content player will be displayed here</div>;
        case "assignment":
            return <div className="p-6">Metadata content will be displayed here</div>;
        case "transcript":
            return <div className="p-6">Transcript content will be displayed here</div>;
        default:
            return <ContentDetailPreview data={sampleContentData} viewportWidth={1024} onDetailsPage={true} />;
    }
};

export default ContentDetailsView;
