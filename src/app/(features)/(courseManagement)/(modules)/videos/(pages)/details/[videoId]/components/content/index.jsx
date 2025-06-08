import { VideoDetailPreview } from "../../../../form/components/preview/video-detail-preview";
import { sampleVideoData } from "../../../../form/utils/seeds";

const VideoDetailsView = ({ activeTab }) => {
    switch (activeTab) {
        case "overview":
            return <VideoDetailPreview initialData={sampleVideoData} viewportWidth={1024} onDetailsPage={true} />;
        case "quiz":
            return <div className="p-6">Video player will be displayed here</div>;
        case "assignment":
            return <div className="p-6">Metadata content will be displayed here</div>;
        case "transcript":
            return <div className="p-6">Transcript content will be displayed here</div>;
        default:
            return <VideoDetailPreview data={sampleVideoData} viewportWidth={1024} onDetailsPage={true} />;
    }
};

export default VideoDetailsView;
