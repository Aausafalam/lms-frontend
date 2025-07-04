"use client";

import { useState, useEffect } from "react";
import { Crown, CheckCircle, TrendingUp, BookOpen, Book, Library } from "lucide-react";
import { useNavigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function SubscriptionCard({ data }) {
    const { navigate } = useNavigation();
    const [subscriptionData, setSubscriptionData] = useState({
        id: "1",
        name: "Basic Monthly Access",
        planType: "TIERED",
        description: "Perfect for beginners starting their learning journey",
        price: 19900,
        originalPrice: 29900,
        currency: "INR",
        billingCycle: {
            duration: 30,
            unit: "DAY",
        },
        metadata: {
            isPopular: false,
            hasCertificate: true,
            badge: "Best for Beginners",
        },
        trial: {
            isTrialAvailable: false,
        },
        isActive: true,
        features: ["Access to 5 courses", "Basic support", "Mobile app access"],
        courses: [],
        enrollmentCount: 1250,
        growthPercentage: 12.5,
        supportLevel: "basic support",
    });

    useEffect(() => {
        if (data) {
            setSubscriptionData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]);

    const handleCardClick = () => {
        navigate(`/subscriptions/details/${subscriptionData.id}`);
    };

    const formatPrice = (price, currency = "INR") => {
        const symbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹", CAD: "C$" };
        const amount = price;
        return `${symbols[currency] || "₹"}${amount.toFixed(0)}`;
    };

    const formatBillingCycle = (billingCycle) => {
        if (!billingCycle?.duration || !billingCycle?.unit) return "30 days";
        const unit = billingCycle.unit.toLowerCase();
        return `${billingCycle.duration} ${unit}${billingCycle.duration > 1 ? "s" : ""}`;
    };

    const discountPercentage =
        subscriptionData.price && subscriptionData.originalPrice ? Math.round(((subscriptionData.originalPrice - subscriptionData.price) / subscriptionData.originalPrice) * 100) : 0;

    // Mock course data for display
    const mockCourses = [{ name: "Complete React Development" }, { name: "Digital Marketing Fundamentals" }];

    return (
        <div
            className={`group relative w-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/90 dark:hover:bg-gray-800 cursor-pointer flex flex-col h-full border ${
                subscriptionData.metadata?.isPopular ? "ring-2 ring-yellow-400 ring-opacity-50" : "border-gray-200 dark:border-gray-700"
            }`}
            onClick={handleCardClick}
        >
            {/* Header with Toggle */}
            <div className="flex items-center justify-between p-4 pb-2">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <Crown className="h-6 w-6 text-orange-500 dark:text-orange-400" />
                    </div>
                    {subscriptionData.metadata?.isPopular && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-xs">
                            <Crown className="h-3 w-3 mr-1" />
                            Most Popular
                        </Badge>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Switch
                        checked={subscriptionData.isActive}
                        onCheckedChange={(checked) => {
                            // Handle toggle change
                            console.log("Toggle plan status:", checked);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="data-[state=checked]:bg-orange-500 "
                    />
                </div>
            </div>

            {/* Plan Details */}
            <div className="px-4 pb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">{subscriptionData.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 min-h-9">{subscriptionData.description}</p>
            </div>

            {/* Pricing */}
            <div className="px-4 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{formatPrice(subscriptionData.price, subscriptionData.currency)}</span>
                        {subscriptionData.originalPrice && <span className="text-sm text-gray-400 line-through">{formatPrice(subscriptionData.originalPrice, subscriptionData.currency)}</span>}
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{formatBillingCycle(subscriptionData.billingCycle)}</div>
                    </div>
                </div>
            </div>

            {/* Included Courses */}
            <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Included Courses</span>
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{subscriptionData.courses?.length || 0} courses</span>
                </div>
                <div className="space-y-1">
                    {data.courses.map((course, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            {/* <div className="w-1 h-1 bg-orange-500 rounded-full mr-2"></div> */}
                            <BookOpen className="h-3 w-3 text-orange-500" />
                            <span className="truncate">{course.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Statistics */}
            <div className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center  rounded-sm">
                        <div className="text-xl font-bold text-orange-600 dark:text-orange-400">{subscriptionData.enrollmentCount?.toLocaleString() || "1,250"}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Subscribers</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-xl font-bold text-green-600 dark:text-green-400">{subscriptionData.growthPercentage || 12.5}%</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Growth</div>
                    </div>
                </div>
            </div>

            {/* Key Features */}
            <div className="px-4 pb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Features</h4>
                <div className="space-y-1">
                    {subscriptionData.features?.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
