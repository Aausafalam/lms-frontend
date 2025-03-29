import { NotificationProvider } from "./notification";
import { InstructorProvider } from "./instructor";
import { LoadingProvider } from "./loading";
import { TemplateProvider } from "./template";
import { CourseProvider } from "./course";
import { PermissionGroupProvider } from "./permissionGroup";
import { PermissionProvider } from "./permission";
import { RoutesProvider } from "./routes";
import { RolesProvider } from "./roles";

const ContextProviders = ({ children }) => {
    return (
        <LoadingProvider>
            <NotificationProvider>
                <TemplateProvider>
                    <InstructorProvider>
                        <RoutesProvider>
                            <PermissionGroupProvider>
                                <PermissionProvider>
                                    <RolesProvider>
                                        <CourseProvider>{children}</CourseProvider>
                                    </RolesProvider>
                                </PermissionProvider>
                            </PermissionGroupProvider>
                        </RoutesProvider>
                    </InstructorProvider>
                </TemplateProvider>
            </NotificationProvider>
        </LoadingProvider>
    );
};
export default ContextProviders;
