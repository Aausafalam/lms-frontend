import { sampleQuestionData } from "../../../../form/utils/seeds"
import { QuestionDetailPreview } from "../../../../form/components/preview/question-detail-preview"

const QuestionDetailsContent = ({ activeTab }) => {
  switch (activeTab) {
    case "overview":
      return <QuestionDetailPreview initialData={sampleQuestionData} viewportWidth={1024} onDetailsPage={true} />
    case "analytics":
      return <div className="p-6">Question analytics and performance data will be displayed here</div>
    case "usage":
      return <div className="p-6">Question usage history and exam associations will be displayed here</div>
    case "versions":
      return <div className="p-6">Question version history will be displayed here</div>
    default:
      return <QuestionDetailPreview initialData={sampleQuestionData} viewportWidth={1024} onDetailsPage={true} />
  }
}

export default QuestionDetailsContent
