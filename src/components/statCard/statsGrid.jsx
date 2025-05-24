"use client";

import { Book, BookOpen, Clock, GraduationCap, Users, TrendingUp, Award, Zap, BarChart } from "lucide-react";

import { useState, useEffect } from "react";
import { StatsCard } from ".";

export function StatsGrid({ type, className }) {
    // In a real app, you would fetch this data from your API
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            let timeoutId;
            timeoutId = setTimeout(() => {
                setIsLoaded(true);
            }, 500);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    // Generate realistic looking chart data
    const generateChartData = (trend) => {
        const length = 20;
        const data = [];

        switch (trend) {
            case "up":
                // Upward trend with small variations
                for (let i = 0; i < length; i++) {
                    data.push(50 + i * 2.5 + (Math.random() * 10 - 5));
                }
                break;
            case "down":
                // Downward trend with small variations
                for (let i = 0; i < length; i++) {
                    data.push(100 - i * 2.5 + (Math.random() * 10 - 5));
                }
                break;
            case "volatile":
                // More volatile pattern
                for (let i = 0; i < length; i++) {
                    data.push(70 + Math.sin(i * 0.5) * 20 + (Math.random() * 15 - 7.5));
                }
                break;
            case "stable":
                // Stable with small variations
                for (let i = 0; i < length; i++) {
                    data.push(80 + (Math.random() * 10 - 5));
                }
                break;
        }

        return data;
    };

    if (type === "courses") {
        return (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 ${className}`}>
                <StatsCard title="Total Courses" value={156} icon={<Book className="h-5 w-5" />} variant="orange" premium={true} chartData={generateChartData("up")} showSparkline={true} />
                <StatsCard
                    title="Active Courses"
                    value={89}
                    trend={{ value: 12, isPositive: true }}
                    icon={<BookOpen className="h-5 w-5" />}
                    variant="blue"
                    showSparkline={true}
                    chartData={generateChartData("volatile")}
                />
                <StatsCard title="Ongoing Courses" value={42} icon={<Clock className="h-5 w-5" />} variant="purple" showSparkline={true} chartData={generateChartData("stable")} />
                <StatsCard
                    title="Completed Courses"
                    value={67}
                    trend={{ value: 8, isPositive: true }}
                    icon={<GraduationCap className="h-5 w-5" />}
                    variant="green"
                    showSparkline={true}
                    chartData={generateChartData("up")}
                />
                <StatsCard title="Draft Courses" value={23} icon={<Book className="h-5 w-5" />}  showSparkline={true} chartData={generateChartData("down")} />
            </div>
        );
    }

    if (type === "instructors") {
        return (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}>
                <StatsCard title="Total Instructors" value={48} icon={<Users className="h-5 w-5" />} variant="orange" premium={true} showSparkline={true} chartData={generateChartData("up")} />
                <StatsCard
                    title="Active Instructors"
                    value={36}
                    trend={{ value: 5, isPositive: true }}
                    icon={<Award className="h-5 w-5" />}
                    variant="green"
                    showSparkline={true}
                    chartData={generateChartData("volatile")}
                />
                <StatsCard
                    title="Top Performers"
                    value={12}
                    trend={{ value: 2, isPositive: true }}
                    icon={<TrendingUp className="h-5 w-5" />}
                    variant="purple"
                    description="Based on ratings"
                    showSparkline={true}
                    chartData={generateChartData("stable")}
                />
            </div>
        );
    }

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ${className}`}>
            <StatsCard title="Total Students" value={2456} icon={<Users className="h-5 w-5" />} variant="orange" premium={true} showSparkline={true} chartData={generateChartData("up")} />
            <StatsCard
                title="Active Students"
                value={1892}
                trend={{ value: 15, isPositive: true }}
                icon={<Zap className="h-5 w-5" />}
                variant="blue"
                showSparkline={true}
                chartData={generateChartData("volatile")}
            />
            <StatsCard
                title="New This Month"
                value={128}
                trend={{ value: 23, isPositive: true }}
                icon={<TrendingUp className="h-5 w-5" />}
                variant="purple"
                showSparkline={true}
                chartData={generateChartData("up")}
            />
            <StatsCard
                title="Course Completion"
                value="78%"
                description="Average completion rate"
                icon={<BarChart className="h-5 w-5" />}
                variant="green"
                showSparkline={true}
                chartData={generateChartData("stable")}
            />
        </div>
    );
}
