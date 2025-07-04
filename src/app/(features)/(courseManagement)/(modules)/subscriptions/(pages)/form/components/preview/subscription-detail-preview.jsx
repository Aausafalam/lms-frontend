"use client"

import { useState } from "react"
import { CreditCard, Star, CheckCircle, Shield, Award, Zap, Crown, Gift, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { ContentCard } from "@/components/contentCard"

const devicePresets = {
  mobile: 400,
  tablet: 768,
  desktop: 1024,
}

export function SubscriptionDetailPreview({ initialData, viewportWidth, onDetailsPage }) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const data = initialData

  const isMobile = viewportWidth <= devicePresets.mobile
  const isTablet = viewportWidth > devicePresets.mobile && viewportWidth <= devicePresets.tablet
  const isDesktop = viewportWidth > devicePresets.tablet

  const handleBack = () => console.log("Back clicked")
  const handleEdit = () => console.log("Edit clicked")
  const handleDuplicate = () => console.log("Duplicate clicked")
  const handleDelete = () => console.log("Delete clicked")

  const formatPrice = (price, currency = "INR") => {
    const symbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹", CAD: "C$" }
    const amount = price / 100 // Convert from paise/cents to main currency
    return `${symbols[currency] || "₹"}${amount.toFixed(0)}`
  }

  const formatBillingCycle = (billingCycle) => {
    if (!billingCycle?.duration || !billingCycle?.unit) return ""
    const unit = billingCycle.unit.toLowerCase()
    return `${billingCycle.duration} ${unit}${billingCycle.duration > 1 ? "s" : ""}`
  }

  const discountPercentage =
    data?.price && data?.originalPrice ? Math.round(((data.originalPrice - data.price) / data.originalPrice) * 100) : 0

  const customBadges = [
    ...(data?.metadata?.isPopular
      ? [
          {
            key: "popular",
            label: "Most Popular",
            variant: "default",
            className: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0",
          },
        ]
      : []),
    ...(data?.trial?.isTrialAvailable
      ? [
          {
            key: "trial",
            label: "Free Trial",
            variant: "outline",
            className: "bg-green-50 text-green-700 border-green-200",
          },
        ]
      : []),
    ...(discountPercentage > 0
      ? [
          {
            key: "discount",
            label: `${discountPercentage}% OFF`,
            variant: "outline",
            className: "bg-red-50 text-red-700 border-red-200",
          },
        ]
      : []),
  ]

  // Mock course data for preview
  const mockCourses = [
    { id: "course-react-001", name: "Complete React Development", description: "Master React from basics to advanced" },
    {
      id: "course-marketing-001",
      name: "Digital Marketing Fundamentals",
      description: "Learn digital marketing strategies",
    },
  ]

  return (
    <div className={`w-full ${onDetailsPage ? "max-w-[1225px]" : ""}`}>
      <Header
        isMobile={isMobile}
        badges={customBadges}
        onBack={handleBack}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        data={{ ...data, number: data?.name || "Subscription Plan" }}
      />

      <div className="mx-auto mt-4">
        <div className={isMobile || isTablet ? "space-y-8" : "grid grid-cols-3 gap-8"}>
          <div className={isMobile || isTablet ? "space-y-6" : "col-span-2 space-y-6 h-[77vh] overflow-scroll pr-2"}>
            {/* Plan Overview */}
            <ContentCard
              subTitle="Plan details and benefits"
              title="Plan Overview"
              icon={<CreditCard className="w-[1.1rem] h-[1.1rem] text-orange-600" />}
              headerColor="white"
              isMobile={isMobile}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{data?.name || "Plan Name"}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {data?.planType?.replace("_", " ").toLowerCase() || "Plan Type"}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {data?.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {formatPrice(data.originalPrice, data?.currency)}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {formatPrice(data?.price || 0, data?.currency)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      per {formatBillingCycle(data?.billingCycle)}
                    </p>
                  </div>
                </div>

                <div
                  className={`prose prose-sm dark:prose-invert max-w-none ${
                    showFullDescription ? "" : "line-clamp-3"
                  } ${isMobile ? "text-sm" : "text-sm"}`}
                >
                  {data?.description || "Plan description will appear here..."}
                </div>

                <Button
                  variant="ghost"
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 p-0 h-auto font-semibold text-sm"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Show Less" : "Read More"}
                </Button>
              </div>
            </ContentCard>

            {/* Included Courses */}
            {data?.courses?.length > 0 && (
              <ContentCard
                title="Included Courses"
                subTitle={`${data.courses.length} courses included`}
                Icon={BookOpen}
                headerColor="blue"
                isMobile={isMobile}
              >
                <div className="space-y-3">
                  {mockCourses.slice(0, data.courses.length).map((course, index) => (
                    <div
                      key={course.id}
                      className="flex items-start group hover:bg-blue-50 dark:hover:bg-blue-950/20 p-3 rounded-lg transition-colors border border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                        <BookOpen className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <p
                          className={`text-gray-800 dark:text-gray-200 font-medium ${isMobile ? "text-sm" : "text-sm"}`}
                        >
                          {course.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{course.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ContentCard>
            )}

            {/* Features */}
            {data?.features?.length > 0 && data.features[0] && (
              <ContentCard
                title="What's Included"
                subTitle="Features and benefits of this plan"
                Icon={Star}
                headerColor="emerald"
                isMobile={isMobile}
              >
                <div className="grid gap-3">
                  {data.features
                    .filter((feature) => feature.trim())
                    .map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start group hover:bg-emerald-50 dark:hover:bg-emerald-950/20 p-3 rounded-lg transition-colors"
                      >
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <p
                          className={`text-gray-800 dark:text-gray-200 font-medium leading-relaxed ${isMobile ? "text-sm" : "text-sm"}`}
                        >
                          {feature}
                        </p>
                      </div>
                    ))}
                </div>
              </ContentCard>
            )}

            {/* Access Details */}
            <ContentCard
              title="Access Details"
              subTitle="What you can access with this plan"
              Icon={Shield}
              headerColor="purple"
              isMobile={isMobile}
            >
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Access Type</span>
                  </div>
                  <span className="text-purple-600 dark:text-purple-400 font-medium capitalize">
                    {data?.accessType?.replace("_", " ").toLowerCase() || "All Features"}
                  </span>
                </div>

                {data?.trial?.isTrialAvailable && (
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="font-medium text-gray-900 dark:text-white">Free Trial</span>
                    </div>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {data.trial.trialPeriod?.duration} {data.trial.trialPeriod?.unit?.toLowerCase()}s
                    </span>
                  </div>
                )}
              </div>
            </ContentCard>
          </div>

          {isDesktop && (
            <div className="space-y-6">
              {/* Pricing Card */}
              <ContentCard
                className="rounded-xl shadow-lg overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-indigo-50 dark:from-orange-950/20 dark:to-indigo-950/20 hover:shadow-xl transition-shadow"
                contentClassName="p-6"
                isHideHeader={true}
              >
                <div className="text-center space-y-4">
                  {data?.metadata?.isPopular && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full">
                      <Crown className="h-3 w-3" />
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{data?.name || "Plan Name"}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {formatBillingCycle(data?.billingCycle)} billing
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      {data?.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {formatPrice(data.originalPrice, data?.currency)}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        {formatPrice(data?.price || 0, data?.currency)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      per {formatBillingCycle(data?.billingCycle)}
                    </p>
                    {discountPercentage > 0 && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold rounded-full">
                        <Zap className="h-3 w-3" />
                        Save {discountPercentage}%
                      </div>
                    )}
                  </div>

                  {/* Mock Statistics */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">1,250</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Subscribers</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">12.5%</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Growth</div>
                    </div>
                  </div>

                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    {data?.trial?.isTrialAvailable ? "Start Free Trial" : "Get Started"}
                  </Button>

                  {data?.trial?.isTrialAvailable && data?.trial?.trialPeriod && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {data.trial.trialPeriod.duration} {data.trial.trialPeriod.unit.toLowerCase()}s free trial
                    </p>
                  )}
                </div>
              </ContentCard>

              {/* Plan Benefits */}
              <ContentCard
                headerColor="gray"
                title="Plan Benefits"
                subTitle="Special features and guarantees"
                Icon={Gift}
                className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {data?.metadata?.hasCertificate && (
                      <Badge
                        variant="outline"
                        className="border-purple-200 dark:border-purple-800/50 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-3 py-1.5 text-xs rounded-full"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        Certificate Included
                      </Badge>
                    )}
                    {data?.isActive && (
                      <Badge
                        variant="outline"
                        className="border-green-200 dark:border-green-800/50 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 px-3 py-1.5 text-xs rounded-full"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active Plan
                      </Badge>
                    )}
                    {data?.planType === "LIFETIME_ACCESS" && (
                      <Badge
                        variant="outline"
                        className="border-yellow-200 dark:border-yellow-800/50 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 px-3 py-1.5 text-xs rounded-full"
                      >
                        <Crown className="h-3 w-3 mr-1" />
                        Lifetime Access
                      </Badge>
                    )}
                    {data?.cancellation?.isRefundable && (
                      <Badge
                        variant="outline"
                        className="border-orange-200 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 px-3 py-1.5 text-xs rounded-full"
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        {data.cancellation.refundWindowDays} Day Refund
                      </Badge>
                    )}
                  </div>
                </div>
              </ContentCard>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
