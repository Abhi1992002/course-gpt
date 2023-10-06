import { loadingState } from "@/state/loading";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export function Loading() {
  const setIsLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });

  return (
    <div className="w-screen h-screen fixed inset-0 bg-background z-[100] flex items-center justify-center">
      <Loader2 className="animate-spin w-10 h-10" />
    </div>
  );
}
