import { NotificationProvider } from "./notification";
import { InstructorProvider } from "./instructor";
import { LoadingProvider } from "./loading";
import { TemplateProvider } from "./template";
import { CourseProvider } from "./course";
import { PermissionGroupProvider } from "./permissionGroup";
import { PermissionProvider } from "./permission";

const ContextProviders = ({ children }) => {
    return (
        <LoadingProvider>
            <NotificationProvider>
                <TemplateProvider>
                    <InstructorProvider>
                        <PermissionGroupProvider>
                            <PermissionProvider>
                                <CourseProvider>{children}</CourseProvider>
                            </PermissionProvider>
                        </PermissionGroupProvider>
                    </InstructorProvider>
                </TemplateProvider>
            </NotificationProvider>
        </LoadingProvider>
    );
};
export default ContextProviders;
