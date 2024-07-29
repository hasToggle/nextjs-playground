"use client";

import { useRouter, usePathname } from "next/navigation";
import { Check, CheckCheck } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

export function FetchItemsIndividually() {
  const router = useRouter();
  const isPressed = usePathname().includes("fetch-items-in-parallel");

  const handleOnChange = (pressed: boolean) => {
    if (pressed) {
      router.push(
        "/react-server-components/data-fetching/ssr/fetch-items-in-parallel"
      );
    } else {
      router.push("/react-server-components/data-fetching/ssr");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Toggle
        variant="outline"
        aria-label="Fetch items individually"
        className="w-56"
        onPressedChange={handleOnChange}
        pressed={isPressed}
      >
        {!isPressed && <Check className="mr-2 h-4 w-4" />}
        {isPressed && <CheckCheck className="mr-2 h-4 w-4" />}
        Fetch items in parallel
      </Toggle>
    </div>
  );
}
