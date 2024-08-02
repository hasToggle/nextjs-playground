"use client";

import { useRouter, usePathname } from "next/navigation";
import { Check, CheckCheck } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

export function FetchItemsInParallel() {
  const router = useRouter();
  const pathname = usePathname();
  const isPressed = pathname.includes("fetch-items-in-parallel");

  const handleOnChange = (pressed: boolean) => {
    if (pressed) {
      router.push(`${pathname}/fetch-items-in-parallel`);
    } else {
      router.push(pathname.split("/fetch-items-in-parallel")[0]);
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
