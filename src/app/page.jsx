"use client";

import LayoutWithSidebarNavbar from "./layouts/WithNavbarSidebar";

export default function Home() {
    return (
        <div>
            <LayoutWithSidebarNavbar>
                <h1>Welcome to Next.js!</h1>
                <p>This is a simple example of how to create a Next.js app with a sidebar and a navbar.</p>
            </LayoutWithSidebarNavbar>
        </div>
    );
}
