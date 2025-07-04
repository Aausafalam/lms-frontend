"use client"

import { useState } from "react"
import { CreditCard, Star, CheckCircle, Clock, Users, Shield, Award, Zap, Crown, Gift } from "lucide-react"
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

  const formatPrice = (price, currency = "USD") => {
    const symbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹", CAD: "C$" }
    return `${symbols[currency] || "$"}${price}`
  }

  const formatDuration = (value, unit) => {
    if (!value || !unit) return ""
    return `${value} ${unit}${value > 1 ? "" : ""}`
  }

  const discountPercentage =
    data?.price && data?.originalPrice ? Math.round(((data.originalPrice - data.price) / data.originalPrice) * 100) : 0

  const customBadges = [
    ...(data?.isPopular
      ? [
          {
            key: "popular",
            label: "Most Popular",
            variant: "default",
            className: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0",
          },
        ]
      : []),
    ...(data?.isTrial
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

  return (
    <div className={`w-full ${onDetailsPage ? "max-w-[1225px]" : ""}`}>
      <Header
        isMobile={isMobile}
        badges={customBadges}
        onBack={handleBack}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        data={{ ...data, number: data?.planName || "Subscription Plan" }}
      />

      <div className="mx-auto mt-4">
        <div className={isMobile || isTablet ? "space-y-8" : "grid grid-cols-3 gap-8"}>
          <div className={isMobile || isTablet ? "space-y-6" : "col-span-2 space-y-6 h-[77vh] overflow-scroll pr-2"}>
            {/* Plan Overview */}
            <ContentCard
              subTitle="Plan details and benefits"
              title="Plan Overview"
              icon={<CreditCard className="w-[1.1rem] h-[1.1rem] text-blue-600" />}
              headerColor="white"
              isMobile={isMobile}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{data?.planName || "Plan Name"}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {data?.planType || "Plan Type"} Plan
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {data?.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {formatPrice(data.originalPrice, data?.currency)}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(data?.price || 0, data?.currency)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDuration(data?.durationValue, data?.durationUnit)}
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
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 p-0 h-auto font-semibold text-sm"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Show Less" : "Read More"}
                </Button>
              </div>
            </ContentCard>

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

            {/* Access & Limits */}
            <ContentCard
              title="Access Details"
              subTitle="What you can access with this plan"
              Icon={Shield}
              headerColor="blue"
              isMobile={isMobile}
            >
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Access Type</span>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-medium capitalize">
                    {data?.accessType?.replace("-", " ") || "Full Access"}
                  </span>
                </div>

                {data?.userLimit && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">User Limit</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{data.userLimit} users</span>
                  </div>
                )}

                {data?.supportLevel && (
                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <span className="font-medium text-gray-900 dark:text-white">Support Level</span>
                    </div>
                    <span className="text-purple-600 dark:text-purple-400 font-medium capitalize">
                      {data.supportLevel} Support
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
                className="rounded-xl shadow-lg overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 hover:shadow-xl transition-shadow"
                contentClassName="p-6"
                isHideHeader={true}
              >
                <div className="text-center space-y-4">
                  {data?.isPopular && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full">
                      <Crown className="h-3 w-3" />
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{data?.planName || "Plan Name"}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {data?.planType || "monthly"} billing
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      {data?.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {formatPrice(data.originalPrice, data?.currency)}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(data?.price || 0, data?.currency)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      per {formatDuration(data?.durationValue, data?.durationUnit)}
                    </p>
                    {discountPercentage > 0 && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold rounded-full">
                        <Zap className="h-3 w-3" />
                        Save {discountPercentage}%
                      </div>
                    )}
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    {data?.isTrial ? "Start Free Trial" : "Get Started"}
                  </Button>

                  {data?.isTrial && data?.trialDuration && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{data.trialDuration} days free trial</p>
                  )}
                </div>
              </ContentCard>

              {/* Plan Badges */}
              <ContentCard
                headerColor="gray"
                title="Plan Benefits"
                subTitle="Special features and guarantees"
                Icon={Gift}
                className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {data?.hasCertificate && (
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
                    {data?.planType === "lifetime" && (
                      <Badge
                        variant="outline"
                        className="border-yellow-200 dark:border-yellow-800/50 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 px-3 py-1.5 text-xs rounded-full"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        Lifetime Access
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
