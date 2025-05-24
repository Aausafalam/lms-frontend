"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, BookOpen } from "lucide-react";
import Image from "next/image";
import { useNavigation } from "@/components/navigation";

export function InstructorCard({
    data = {
        id: "1",
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@example.com",
        phone: "+1 (555) 123-4567",
        title: "Senior Data Science Instructor",
        bio: "Dr. Johnson has over 15 years of experience in data science and machine learning. She previously worked at Google and has a PhD in Computer Science from Stanford. Her research focuses on developing novel algorithms for predictive analytics and she has published numerous papers in top-tier conferences.",
        expertise: ["Data Science", "Machine Learning", "Python", "Statistics", "Deep Learning", "Natural Language Processing"],
        rating: 4.9,
        courses: 12,
        students: 2450,
        imageUrl: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150",
    },
    onClick,
}) {
    const { navigate } = useNavigation();
    return (
        <Card
            className="overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl border border-gray-200"
            // onClick={onClick}
        >
            <div className="relative h-56 overflow-hidden">
                <Image src={data.imageUrl || "/placeholder.svg"} alt={data.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3
                        className="text-xl font-bold text-white cursor-pointer hover:underline"
                        onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/instructors/details/${data.id}`);
                        }}
                    >
                        {data.name}
                    </h3>
                    <p className="text-white/90 text-sm">{data.title}</p>
                </div>
            </div>

            <CardContent className="p-4 dark:text-gray-200">
                <div className="flex flex-wrap gap-2 mb-4">
                    {data.expertise.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800">
                            {skill}
                        </Badge>
                    ))}
                    {data.expertise.length > 3 && (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                            +{data.expertise.length - 3}
                        </Badge>
                    )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">{data.bio}</p>
            </CardContent>

            <CardFooter className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center text-sm border-t dark:border-gray-700">
                <div className="flex items-center text-amber-500">
                    <Star className="h-4 w-4 fill-amber-500 mr-1" />
                    <span className="font-medium">{data.rating}</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{data.courses} courses</span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{data.students.toLocaleString()}</span>
                </div>
            </CardFooter>
        </Card>
    );
}
