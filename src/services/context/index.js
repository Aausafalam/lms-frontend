import { NotificationProvider } from "./notification";
import { InstituteProvider } from "./institute";
import { LoadingProvider } from "./loading";
import { TemplateProvider } from "./template";

const ContextProviders = ({ children }) => {
    return (
        <LoadingProvider>
            <NotificationProvider>
                <TemplateProvider>
                    <InstituteProvider>{children}</InstituteProvider>
                </TemplateProvider>
            </NotificationProvider>
        </LoadingProvider>
    );
};
export default ContextProviders;
