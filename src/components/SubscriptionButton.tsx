"use client";

import React from "react";
import axios from "axios";
import { Button } from "./ui/button";

type SubscriptionButtonProps = {
  isPro: boolean;
};

export function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
  const [loading, setLoading] = React.useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log("billing error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="mt-4 bg-foreground"
      disabled={loading}
      onClick={handleSubscribe}
    >
      {isPro ? "Manage Subscription" : "upgrade"}
    </Button>
  );
}
