import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsGrid } from "@/components/stats-grid";

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="container mx-auto py-12 space-y-10">
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 text-transparent bg-clip-text">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Overview of your LMS platform statistics with premium visualizations</p>
                </div>

                <div className="bg-white/70 dark:bg-gray-800/20 backdrop-blur-md rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-lg">
                    <Tabs defaultValue="courses">
                        <TabsList className="mb-8 w-full justify-start border-b pb-px">
                            <TabsTrigger
                                value="courses"
                                className="data-[state=active]:bg-orange-50 dark:data-[state=active]:bg-orange-900/20 data-[state=active]:text-orange-500 dark:data-[state=active]:text-orange-400 rounded-t-lg"
                            >
                                Courses
                            </TabsTrigger>
                            <TabsTrigger
                                value="instructors"
                                className="data-[state=active]:bg-orange-50 dark:data-[state=active]:bg-orange-900/20 data-[state=active]:text-orange-500 dark:data-[state=active]:text-orange-400 rounded-t-lg"
                            >
                                Instructors
                            </TabsTrigger>
                            <TabsTrigger
                                value="students"
                                className="data-[state=active]:bg-orange-50 dark:data-[state=active]:bg-orange-900/20 data-[state=active]:text-orange-500 dark:data-[state=active]:text-orange-400 rounded-t-lg"
                            >
                                Students
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="courses" className="mt-0">
                            <StatsGrid type="courses" />
                        </TabsContent>
                        <TabsContent value="instructors" className="mt-0">
                            <StatsGrid type="instructors" />
                        </TabsContent>
                        <TabsContent value="students" className="mt-0">
                            <StatsGrid type="students" />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
