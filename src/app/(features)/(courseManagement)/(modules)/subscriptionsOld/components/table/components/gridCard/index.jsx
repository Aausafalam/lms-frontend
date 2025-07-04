"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Crown, Gift, CheckCircle, Users, Shield } from "lucide-react"
import { useNavigation } from "@/components/navigation"
import { useQueryParams } from "@/lib/hooks/useQuery"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function SubscriptionCard({ data }) {
  const { navigate } = useNavigation()
  const { courseId } = useQueryParams()
  const [subscriptionData, setSubscriptionData] = useState({
    id: "1",
    planName: "Premium Monthly",
    planType: "monthly",
    description: "Get unlimited access to all courses with premium features and priority support.",
    price: 29.99,
    originalPrice: 39.99,
    currency: "USD",
    durationValue: 1,
    durationUnit: "months",
    isPopular: true,
    isTrial: false,
    hasCertificate: true,
    isActive: true,
    features: ["Unlimited Course Access", "Priority Support", "Certificate Included", "Mobile App Access"],
    enrollmentCount: 1250,
    maxEnrollments: 2000,
  })

  useEffect(() => {
    if (data) {
      setSubscriptionData((prevData) => ({ ...prevData, ...data }))
    }
  }, [data])

  const handleCardClick = () => {
    navigate(`/subscriptions/details/${subscriptionData.id}?courseId=${courseId}`)
  }

  const formatPrice = (price, currency = "USD") => {
    const symbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹", CAD: "C$" }
    return `${symbols[currency] || "$"}${price}`
  }

  const formatDuration = (value, unit) => {
    if (!value || !unit) return ""
    return `${value} ${unit}${value > 1 ? "" : ""}`
  }

  const discountPercentage =
    subscriptionData.price && subscriptionData.originalPrice
      ? Math.round(((subscriptionData.originalPrice - subscriptionData.price) / subscriptionData.originalPrice) * 100)
      : 0

  const enrollmentPercentage = subscriptionData.maxEnrollments
    ? Math.round((subscriptionData.enrollmentCount / subscriptionData.maxEnrollments) * 100)
    : 0

  return (
    <div
      className={`group relative w-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/90 dark:hover:bg-gray-800 cursor-pointer flex flex-col ${
        subscriptionData.isPopular ? "ring-2 ring-yellow-400 ring-opacity-50" : ""
      }`}
      onClick={handleCardClick}
    >
      {/* Popular Badge */}
      {subscriptionData.isPopular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
            <Crown className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      {/* Header with gradient */}
      <div
        className={`relative p-6 pb-4 ${
          subscriptionData.isPopular
            ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
            : "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {subscriptionData.planName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{subscriptionData.planType} plan</p>
          </div>

          <div className="flex flex-col items-end">
            {subscriptionData.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(subscriptionData.originalPrice, subscriptionData.currency)}
              </span>
            )}
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(subscriptionData.price, subscriptionData.currency)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              per {formatDuration(subscriptionData.durationValue, subscriptionData.durationUnit)}
            </span>
          </div>
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold rounded-full">
            Save {discountPercentage}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 pt-2 flex-grow flex flex-col">
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 flex-grow">
          {subscriptionData.description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {subscriptionData.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="truncate">{feature}</span>
            </div>
          ))}
          {subscriptionData.features.length > 3 && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              +{subscriptionData.features.length - 3} more features
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4 pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>{subscriptionData.enrollmentCount} enrolled</span>
          </div>
          {subscriptionData.maxEnrollments && (
            <div className="flex items-center">
              <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                <div
                  className="h-1 bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${enrollmentPercentage}%` }}
                ></div>
              </div>
              <span>{enrollmentPercentage}% full</span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {subscriptionData.isTrial && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
              <Gift className="h-3 w-3 mr-1" />
              Free Trial
            </Badge>
          )}
          {subscriptionData.hasCertificate && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Certificate
            </Badge>
          )}
          {!subscriptionData.isActive && (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-xs">
              Inactive
            </Badge>
          )}
        </div>

        {/* Action Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/subscriptions/details/${subscriptionData.id}?courseId=${courseId}`)
          }}
          className={`w-full transition-all duration-300 ${
            subscriptionData.isPopular
              ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          View Details
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
