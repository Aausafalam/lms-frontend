import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";


export function CourseReviews({ reviews }) {
    return (
        <div className="space-y-8 mt-3 dark:text-white">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                    <div className="bg-card p-8 rounded-2xl border shadow-sm text-center dark:border-gray-700 dark:bg-gray-800">
                        <div className="text-5xl font-semibold mb-2">4.9</div>
                        <div className="flex items-center justify-center mb-3 gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-5 w-5 text-primary fill-primary" />
                            ))}
                        </div>
                        <p className="text-muted-foreground mb-6 text-sm">Course Rating</p>

                        <div className="space-y-3 mb-8">
                            {[
                                { stars: 5, percentage: 85 },
                                { stars: 4, percentage: 10 },
                                { stars: 3, percentage: 3 },
                                { stars: 2, percentage: 1 },
                                { stars: 1, percentage: 1 },
                            ].map((rating) => (
                                <div key={rating.stars} className="flex items-center gap-2">
                                    <div className="flex items-center w-20">
                                        <span className="text-sm font-medium mr-1">{rating.stars}</span>
                                        <Star className="h-4 w-4 text-primary fill-primary" />
                                    </div>
                                    <Progress value={rating.percentage} className="h-2 flex-1" />
                                    <span className="text-muted-foreground w-10 text-sm">{rating.percentage}%</span>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            {/* <p className="font-medium text-md mb-1">{reviews.length} Reviews</p>
                            <p className="text-sm text-muted-foreground mb-4">From verified students</p> */}
                            <Button className="w-full  rounded-full">Write a Review</Button>
                        </div>
                    </div>
                </div>

                <div className="md:w-2/3 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold  flex items-center">
                            <span className="w-1.5 h-6 bg-primary rounded-full mr-3 inline-block"></span>
                            Student Feedback
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Sort by:</span>
                            <select className="text-sm border rounded-full px-3 py-1 bg-background">
                                <option>Most Helpful</option>
                                <option>Most Recent</option>
                                <option>Highest Rated</option>
                                <option>Lowest Rated</option>
                            </select>
                        </div>
                    </div>

                    {reviews.map((review, index) => (
                        <div key={index} className="border rounded-xl p-6 space-y-4 hover:shadow-md transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center">
                                    <Avatar className="h-12 w-12 mr-4 border">
                                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-md">{review.name}</p>
                                        <p className="text-xs text-muted-foreground">{review.date}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`h-5 w-5 ${star <= review.rating ? "text-primary fill-primary" : "text-muted stroke-muted-foreground"}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed">{review.comment}</p>
                            <div className="flex items-center justify-between">
                                <Button variant="ghost" size="sm" className="text-sm rounded-full">
                                    <span className=" text-sm">Was this helpful?</span> ({review.helpful})
                                </Button>
                                <Button variant="ghost" size="sm" className="text-sm rounded-full">
                                    Report
                                </Button>
                            </div>

                            {review.reply && (
                                <div className="bg-muted/30 p-5 rounded-xl mt-3 border-l-2 border-primary">
                                    <div className="flex items-center mb-3">
                                        <Avatar className="h-10 w-10 mr-3">
                                            <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop" alt="Instructor" />
                                            <AvatarFallback>SJ</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-base font-semibold">
                                                {review.reply.name}{" "}
                                                <Badge variant="outline" className="ml-1 text-xs">
                                                    Instructor
                                                </Badge>
                                            </p>
                                            <p className="text-xs text-muted-foreground">{review.reply.date}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm">{review.reply.comment}</p>
                                </div>
                            )}
                        </div>
                    ))}

                    <Button variant="outline" className="w-full rounded-full py-3">
                        Load More Reviews
                    </Button>
                </div>
            </div>
        </div>
    );
}
