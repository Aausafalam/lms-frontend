"use client";

interface CourseTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function CourseTabs({ activeTab, setActiveTab }: CourseTabsProps) {
    return (
        <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex whitespace-nowrap px-4 py-2 min-w-full">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "overview"
                                ? "text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400"
                                : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
                        }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("learn")}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "learn"
                                ? "text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400"
                                : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
                        }`}
                    >
                        What You&apos;ll Learn
                    </button>
                    <button
                        onClick={() => setActiveTab("requirements")}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "requirements"
                                ? "text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400"
                                : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
                        }`}
                    >
                        Requirements
                    </button>
                    <button
                        onClick={() => setActiveTab("skills")}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "skills"
                                ? "text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400"
                                : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
                        }`}
                    >
                        Skills
                    </button>
                    <button
                        onClick={() => setActiveTab("instructors")}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "instructors"
                                ? "text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400"
                                : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
                        }`}
                    >
                        Instructors
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "reviews"
                                ? "text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400"
                                : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
                        }`}
                    >
                        Reviews
                    </button>
                </div>
            </div>
        </div>
    );
}
