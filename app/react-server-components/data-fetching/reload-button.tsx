"use client";

import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Reload() {
  const router = useRouter();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        aria-label="Fetch items individually"
        className="w-28"
        onClick={() => {
          router.refresh();
        }}
      >
        <RefreshCcw className="mr-2 h-4 w-4" />
        Reload
      </Button>
    </div>
  );
}
