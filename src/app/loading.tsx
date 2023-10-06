import { Loader2 } from "lucide-react";
import React from "react";

function LoadingComponent() {
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Loader2 className="animate-spin w-10 h-10" />
    </div>
  );
}

export default LoadingComponent;
