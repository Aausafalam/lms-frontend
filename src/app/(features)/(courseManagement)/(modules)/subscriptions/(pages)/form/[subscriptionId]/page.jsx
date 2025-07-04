"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SubscriptionFormBase from "..";
import { sampleSubscriptionData } from "../utils/seeds";
import { useSubscriptionGetDetails } from "@/services/hooks/subscription";

const EditSubscription = () => {
    const { subscriptionId } = useParams();
    const { subscriptionDetails } = useSubscriptionGetDetails();
    useEffect(() => {
        subscriptionDetails.fetch({ dynamicRoute: `/${subscriptionId}` });
    }, [subscriptionId]);

    if (subscriptionDetails.isLoading) return <div className="flex items-center justify-center h-64">Loading subscription data...</div>;
    if (!subscriptionDetails?.data) return <div className="flex items-center justify-center h-64">Subscription data not found.</div>;

    return <SubscriptionFormBase initialData={{ ...subscriptionDetails?.data, courses: subscriptionDetails?.data?.courses?.map((item) => item.id) || [] }} subscriptionId={subscriptionId} />;
};

export default EditSubscription;
