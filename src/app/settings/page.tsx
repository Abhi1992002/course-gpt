import { SubscriptionButton } from "@/components/SubscriptionButton";
import Background from "@/components/background/page";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

const SettingsPage = async ({}) => {
  const isPro = await checkSubscription();

  return (
    <div className="w-[100vw] h-[90vh] flex items-center justify-center">
      {/* <Background /> */}
      <div className="py-8 flex items-center justify-center flex-col my-auto w-[300px] mx-auto border-1 backdrop-blur-3xl bg-background rounded-lg">
        <h1 className="text-3xl font-bold">Settings</h1>
        {isPro ? (
          <p className="text-xl text-secondary-foreground/60">
            You are a pro user !
          </p>
        ) : (
          <p className="text-xl text-secondary-foreground/60">
            You are a free user !
          </p>
        )}

        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
