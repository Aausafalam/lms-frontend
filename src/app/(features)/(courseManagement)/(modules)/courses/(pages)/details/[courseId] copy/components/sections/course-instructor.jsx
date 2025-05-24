import Image from "next/image";
import { Star, Users, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

export function CourseInstructor({ instructor }) {
    return (
        <div className="space-y-10 dark:text-white">
            <div className="bg-card p-8 rounded-2xl border shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="md:w-1/4 flex flex-col items-center text-center">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary mb-4">
                            <Image src={instructor.avatar || "/placeholder.svg"} alt={instructor.name} fill className="object-cover" />
                        </div>
                        <h2 className="text-xl font-semibold mb-1 dark:text-white">{instructor.name}</h2>
                        <p className="text-primary mb-3">{instructor.title}</p>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="flex items-center">
                                <Star className="h-4 w-4 text-primary fill-primary mr-1" />
                                <span className="text-sm">{instructor.rating}</span>
                            </div>
                            <div className="flex items-center">
                                <Users className="h-4 w-4 text-muted-foreground mr-1 dark:text-white" />
                                <span className="text-sm">{instructor.students}</span>
                            </div>
                            <div className="flex items-center">
                                <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
                                <span className="text-sm">{instructor.courses}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="text-xs rounded-full">
                                <MessageSquare className="h-3 w-3" /> Contact
                            </Button>
                            <Button className="text-xs rounded-full">View Profile</Button>
                        </div>
                    </div>
                    <div className="md:w-3/4">
                        <h3 className="text-lg font-bold mb-4 flex items-center dark:text-white">
                            <span className="w-1.5 h-6 bg-primary rounded-full mr-3 inline-block"></span>
                            About the Instructor
                        </h3>
                        <div className="prose dark:prose-invert max-w-none dark:text-white">
                            {instructor.bio.map((paragraph, index) => (
                                <p key={index} className={index === 0 ? "text-sm leading-relaxed" : " text-sm leading-relaxed"}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        <div className="mt-6">
                            <h4 className="text-md  mb-3 dark:text-white">Areas of Expertise:</h4>
                            <div className="flex flex-wrap gap-2">
                                {instructor.expertise.map((skill) => (
                                    <Badge key={skill} variant="secondary">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                    <span className="w-1.5 h-6 bg-primary rounded-full mr-3 inline-block"></span>
                    Other Courses by {instructor.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {instructor.otherCourses.map((course, i) => (
                        <Card key={i} className="overflow-hidden group hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
                            <div className="relative h-48">
                                <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 left-3">
                                    <Badge className="bg-primary hover:bg-primary/90 text-white">{course.badge}</Badge>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="p-4 w-full">
                                        <Button className="w-full bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20  rounded-full">View Course</Button>
                                    </div>
                                </div>
                            </div>
                            <CardContent className="p-5">
                                <h4 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{instructor.name}</p>
                                <div className="flex items-center mb-3">
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 text-primary fill-primary mr-1" />
                                        <span className="text-sm font-medium">{course.rating}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground mx-2">•</span>
                                    <span className="text-xs text-muted-foreground">{course.students} students</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-lg">{course.price}</span>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                        <Heart className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Import Heart icon
