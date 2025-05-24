import { Public_Sans } from "next/font/google";
import "./globals.css";
import ContextProviders from "@/services/context";

const publicSans = Public_Sans({
    subsets: ["latin"],
    variable: "--font-public-sans",
    display: "swap",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// export const metadata = {
//     title: "My App",
//     description: "The best app ever.",
// };

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${publicSans.variable}`}>
                <ContextProviders>{children}</ContextProviders>
            </body>
        </html>
    );
}
