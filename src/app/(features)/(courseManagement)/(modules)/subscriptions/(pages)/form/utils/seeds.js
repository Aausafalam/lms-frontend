export const sampleSubscriptionData = {
  id: "sub-premium-monthly-001",
  name: "Premium Monthly Plan",
  planType: "TIERED",
  description:
    "Unlimited access to all current and future courses, premium features, and priority support. Ideal for dedicated learners.",
  price: 2999,
  originalPrice: 3999,
  currency: "INR",
  billingCycle: {
    duration: 1,
    unit: "MONTH",
  },
  accessType: "ALL_FEATURES",
  features: [
    "Unlimited Course Access",
    "Downloadable Resources",
    "Priority Support",
    "Certificate of Completion",
    "Mobile App Access",
    "Offline Viewing",
    "Live Q&A Sessions",
    "Community Access",
  ],
  courses: ["course-react-001", "course-marketing-001"],
  promos: ["tpp50", "ocp10"],
  trial: {
    isTrialAvailable: false,
    trialPeriod: null,
  },
  metadata: {
    hasCertificate: true,
    isPopular: true,
    badge: "Best for Serious Learners",
    tags: ["full access", "monthly", "certificate"],
  },
  cancellation: {
    isRefundable: false,
    refundWindowDays: 7,
  },
  isActive: true,
}
