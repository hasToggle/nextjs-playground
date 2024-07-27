"use client";

import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Reload() {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        aria-label="Fetch items individually"
        className="w-28"
        onClick={() => {
          window?.location.reload();
        }}
      >
        <RefreshCcw className="mr-2 h-4 w-4" />
        Reload
      </Button>
    </div>
  );
}
