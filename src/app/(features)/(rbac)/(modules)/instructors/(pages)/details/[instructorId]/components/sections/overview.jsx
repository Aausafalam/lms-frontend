import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import GlobalUtils from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, GraduationCap, Mail, Phone, Linkedin, Twitter, Globe, Github, X } from "lucide-react";
import React from "react";

const InstructorOverview = ({ instructor }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Contact info and stats */}
            <Card className="lg:col-span-1 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-sm">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Mail className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" />
                            <span>{instructor.email}</span>
                        </div>

                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Phone className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" />
                            <span>{instructor.phone}</span>
                        </div>

                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Clock className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" />
                            <span>Availability: {instructor.availability}</span>
                        </div>

                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Calendar className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" />
                            <span>Joined: {GlobalUtils.formatDate(instructor.joinedDate)}</span>
                        </div>
                    </div>

                    <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Social Profiles</h4>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(instructor.socialLinks).map(([platform, url]) => {
                                const Icon = getSocialIcon(platform);
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-orange-100 hover:text-orange-600 dark:hover:bg-orange-900/30 dark:hover:text-orange-400 transition-colors shadow-sm"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Teaching Stats</h4>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-300">Course Completion Rate</span>
                                    <span className="font-medium text-gray-900 dark:text-white">92%</span>
                                </div>
                                <Progress value={92} className="h-2 dark:bg-gray-700" indicatorClassName="bg-gradient-to-r from-orange-600 to-orange-400" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-300">Student Satisfaction</span>
                                    <span className="font-medium text-gray-900 dark:text-white">96%</span>
                                </div>
                                <Progress value={96} className="h-2 dark:bg-gray-700" indicatorClassName="bg-gradient-to-r from-orange-600 to-orange-400" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-300">Response Rate</span>
                                    <span className="font-medium text-gray-900 dark:text-white">88%</span>
                                </div>
                                <Progress value={88} className="h-2 dark:bg-gray-700" indicatorClassName="bg-gradient-to-r from-orange-600 to-orange-400" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Right column - Bio and expertise */}
            <Card className="lg:col-span-2 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-sm">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About</h3>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">Biography</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{instructor.bio}</p>
                    </div>

                    <div>
                        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                            {instructor.expertise.map((skill) => (
                                <Badge key={skill} className="bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/50">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">Teaching Methodology</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {instructor.methodology ||
                                "My teaching approach focuses on practical, hands-on learning with real-world examples. I believe in creating an interactive environment where students can experiment, ask questions, and develop critical thinking skills. Each course is structured to build confidence progressively, with regular feedback and personalized guidance."}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">Education & Experience</h4>
                        <ul className="space-y-3">
                            {instructor.education?.map((edu, index) => (
                                <li key={index} className="flex gap-3">
                                    <GraduationCap className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{edu.degree}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {edu.institution}, {edu.year}
                                        </p>
                                    </div>
                                </li>
                            )) || (
                                <>
                                    <li className="flex gap-3">
                                        <GraduationCap className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Ph.D. in Computer Science</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Stanford University, 2015</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <GraduationCap className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">M.S. in Artificial Intelligence</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">MIT, 2012</p>
                                        </div>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default InstructorOverview;

function getSocialIcon(platform) {
    switch (platform.toLowerCase()) {
        case "linkedin":
            return Linkedin;
        case "twitter":
            return Twitter;
        case "website":
            return Globe;
        case "github":
            return Github;
        default:
            return Globe;
    }
}
