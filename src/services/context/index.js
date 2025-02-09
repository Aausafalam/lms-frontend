import { NotificationProvider } from "./notification";
import { InstructorProvider } from "./instructor";
import { LoadingProvider } from "./loading";
import { TemplateProvider } from "./template";
import { CourseProvider } from "./course";

const ContextProviders = ({ children }) => {
    return (
        <LoadingProvider>
            <NotificationProvider>
                <TemplateProvider>
                    <InstructorProvider>
                        <CourseProvider>{children}</CourseProvider>
                    </InstructorProvider>
                </TemplateProvider>
            </NotificationProvider>
        </LoadingProvider>
    );
};
export default ContextProviders;
