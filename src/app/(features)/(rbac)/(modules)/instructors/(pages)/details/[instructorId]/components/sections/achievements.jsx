import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Award } from "lucide-react";
import React from "react";

const InstructorAchievements = ({ instructor }) => {
    return (
        <Card className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-sm">
            <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Certifications & Achievements</h3>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {instructor.certifications?.map((cert, index) => (
                        <div key={index} className="flex gap-4 p-4 border rounded-lg dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
                            <div className="flex-shrink-0">
                                <Award className="h-10 w-10 text-orange-500 dark:text-orange-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">{cert.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{cert.issuer}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Issued {cert.date}</p>
                            </div>
                        </div>
                    )) || (
                        <>
                            <div className="flex gap-4 p-4 border rounded-lg dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
                                <div className="flex-shrink-0">
                                    <Award className="h-10 w-10 text-orange-500 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">AWS Certified Solutions Architect</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Amazon Web Services</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Issued January 2022</p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 border rounded-lg dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
                                <div className="flex-shrink-0">
                                    <Award className="h-10 w-10 text-orange-500 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Google Professional Data Engineer</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Google Cloud</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Issued March 2021</p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 border rounded-lg dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
                                <div className="flex-shrink-0">
                                    <Award className="h-10 w-10 text-orange-500 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">TensorFlow Developer Certificate</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Google</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Issued November 2020</p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 border rounded-lg dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
                                <div className="flex-shrink-0">
                                    <Award className="h-10 w-10 text-orange-500 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Microsoft Certified: Azure Data Scientist Associate</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Microsoft</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Issued August 2020</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default InstructorAchievements;
