import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const InstructorSchedule = ({ instructor }) => {
    return (
        <Card className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-sm">
            <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Teaching Schedule</h3>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="border rounded-lg p-3 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">{day}</h4>
                            {day === "Monday" && (
                                <>
                                    <div className="mb-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800">
                                        <p className="text-xs font-medium text-blue-800 dark:text-blue-300">9:00 AM - 11:00 AM</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">Advanced Data Science</p>
                                    </div>
                                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-800">
                                        <p className="text-xs font-medium text-green-800 dark:text-green-300">2:00 PM - 4:00 PM</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">Office Hours</p>
                                    </div>
                                </>
                            )}
                            {day === "Wednesday" && (
                                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-100 dark:border-purple-800">
                                    <p className="text-xs font-medium text-purple-800 dark:text-purple-300">1:00 PM - 3:00 PM</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Machine Learning Workshop</p>
                                </div>
                            )}
                            {day === "Thursday" && (
                                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-100 dark:border-orange-800">
                                    <p className="text-xs font-medium text-orange-800 dark:text-orange-300">10:00 AM - 12:00 PM</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Web Development</p>
                                </div>
                            )}
                            {day === "Friday" && (
                                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-800">
                                    <p className="text-xs font-medium text-green-800 dark:text-green-300">3:00 PM - 5:00 PM</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Office Hours</p>
                                </div>
                            )}
                            {(day === "Tuesday" || day === "Saturday" || day === "Sunday") && <p className="text-sm text-gray-500 dark:text-gray-400 italic">No scheduled classes</p>}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default InstructorSchedule;
