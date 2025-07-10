import { NotificationProvider } from "./notification";
import { InstructorProvider } from "./instructor";
import { LoadingProvider } from "./loading";
import { TemplateProvider } from "./template";
import { CourseProvider } from "./course";
import { PermissionGroupProvider } from "./permissionGroup";
import { PermissionProvider } from "./permission";
import { RoutesProvider } from "./routes";
import { RolesProvider } from "./roles";
import { UsersProvider } from "./users";
import { ThemeProvider } from "./theme";
import { AuthProvider } from "./auth";
import { ModuleProvider } from "./module";
import { LessonProvider } from "./lesson";
import { VideoProvider } from "./video";

const ContextProviders = ({ children }) => {
    return (
        <ThemeProvider>
            <LoadingProvider>
                <NotificationProvider>
                    <AuthProvider>
                        <TemplateProvider>
                            <InstructorProvider>
                                <RoutesProvider>
                                    <PermissionGroupProvider>
                                        <PermissionProvider>
                                            <RolesProvider>
                                                <UsersProvider>
                                                    <CourseProvider>
                                                        <ModuleProvider>
                                                            <LessonProvider>
                                                                <VideoProvider>{children}</VideoProvider>
                                                            </LessonProvider>
                                                        </ModuleProvider>
                                                    </CourseProvider>
                                                </UsersProvider>
                                            </RolesProvider>
                                        </PermissionProvider>
                                    </PermissionGroupProvider>
                                </RoutesProvider>
                            </InstructorProvider>
                        </TemplateProvider>
                    </AuthProvider>
                </NotificationProvider>
            </LoadingProvider>
        </ThemeProvider>
    );
};
export default ContextProviders;
