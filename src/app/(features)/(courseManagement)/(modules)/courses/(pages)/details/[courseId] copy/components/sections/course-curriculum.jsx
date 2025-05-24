import { Button } from "@/components/ui/button";
import { Download, Play, Check, FileText, BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function CourseCurriculum({ curriculum }) {
    return (
        <div className="space-y-4 mt-2 dark:text-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-bold flex items-center">
                        <span className="w-1 h-6 bg-primary rounded-full mr-2 inline-block"></span>
                        Course Curriculum
                    </h2>
                    <p className="text-muted-foreground text-xs ml-3">
                        <span className="font-medium">72</span> lessons • <span className="font-medium">48</span> hours • <span className="font-medium">8</span> modules
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-[0.7rem] px-4 rounded-3xl">
                        <Download className="h-3 w-3" /> Syllabus
                    </Button>
                    <Button size="sm" className="text-[0.7rem] px-4 rounded-3xl">
                        <Play className="h-3 w-3" /> Preview
                    </Button>
                </div>
            </div>

            <div className="bg-primary/5 p-3 rounded-xl border border-primary/20 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="bg-primary/20 p-2 rounded-full mr-2">
                        <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                        <p className="font-medium text-sm">Learning Objectives</p>
                        <p className="text-xs text-muted-foreground">Clear objectives for each module</p>
                    </div>
                </div>
                <Button size="sm" className="text-[0.7rem] px-4 rounded-3xl">
                    <GraduationCap className="h-3 w-3" /> Learning Path
                </Button>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
                {curriculum.map((module, index) => (
                    <AccordionItem key={index} value={`module-${index}`} className="border rounded-lg overflow-hidden bg-card shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <AccordionTrigger className="px-3 py-2 hover:bg-muted/30 [&[data-state=open]]:bg-muted/30">
                            <div className="flex items-center text-left w-full gap-2">
                                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 shrink-0 text-xs">{index + 1}</div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-[0.85rem] truncate">{module.title}</h3>
                                    <p className="text-xs text-muted-foreground">
                                        {module.lessons} lessons • {module.duration}
                                    </p>
                                </div>
                                {module.progress > 0 && (
                                    <div className="flex items-center gap-1 mr-2">
                                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${module.progress}%` }}></div>
                                        </div>
                                        <span className="text-xs font-medium">{module.progress}%</span>
                                    </div>
                                )}
                                {module.progress === 100 && <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs py-0.5">Done</Badge>}
                                {module.progress > 0 && module.progress < 100 && <Badge className="bg-primary/10 text-primary border-primary/20 text-xs py-0.5">In Progress</Badge>}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0">
                            <div className="divide-y border-t dark:border-gray-700">
                                {module.items && module.items.length > 0 ? (
                                    module.items.map((lesson, i) => (
                                        <div
                                            key={i}
                                            className={`flex items-center justify-between p-2 hover:bg-muted/30 ${
                                                lesson.active ? "bg-primary/5 border-l-2 border-primary" : ""
                                            } border-b-0 dark:border-gray-700`}
                                        >
                                            <div className="flex items-center">
                                                {lesson.type === "video" ? (
                                                    <div
                                                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                                                            lesson.completed
                                                                ? "bg-green-500 text-white"
                                                                : lesson.active
                                                                ? "bg-primary/20 text-primary border border-primary"
                                                                : "bg-muted/70 text-muted-foreground"
                                                        }`}
                                                    >
                                                        {lesson.completed ? <Check className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                                                    </div>
                                                ) : lesson.type === "assignment" ? (
                                                    <div
                                                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                                                            lesson.completed
                                                                ? "bg-green-500 text-white"
                                                                : lesson.active
                                                                ? "bg-primary/20 text-primary border border-primary"
                                                                : "bg-muted/70 text-muted-foreground"
                                                        }`}
                                                    >
                                                        {lesson.completed ? <Check className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                                                            lesson.completed
                                                                ? "bg-green-500 text-white"
                                                                : lesson.active
                                                                ? "bg-primary/20 text-primary border border-primary"
                                                                : "bg-muted/70 text-muted-foreground"
                                                        }`}
                                                    >
                                                        {lesson.completed ? <Check className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className={`font-medium text-[0.75rem] truncate ${lesson.active ? "text-primary" : ""}`}>{lesson.title}</p>
                                                    <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 ml-2">
                                                {lesson.free && (
                                                    <Badge variant="outline" className="text-xs py-1">
                                                        Preview
                                                    </Badge>
                                                )}
                                                {lesson.active && (
                                                    <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full h-6 text-xs">
                                                        Continue
                                                    </Button>
                                                )}
                                                {!lesson.active && !lesson.completed && (
                                                    <Badge variant="ghost" size="icon" className="h-6 w-6 opacity-50" disabled>
                                                        <Lock className="h-3 w-3" />
                                                    </Badge>
                                                )}
                                                {lesson.completed && (
                                                    <Button variant="outline" size="sm" className="rounded-full h-6 text-xs">
                                                        Review
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-center">
                                        <Lock className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                                        <p className="text-xs text-muted-foreground font-medium">Complete previous modules to unlock</p>
                                        <Button variant="outline" size="xs" className="mt-2 rounded-full ">
                                            Prerequisites
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

// Helper components
function Target(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}

function GraduationCap(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
    );
}

function Lock(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );
}
