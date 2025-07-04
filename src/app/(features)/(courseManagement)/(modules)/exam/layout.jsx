import DashboardLayout from "@/app/layouts/index";

const ExamLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <div id="exam_module">{children}</div>
        </DashboardLayout>
    );
};

export default ExamLayout;
