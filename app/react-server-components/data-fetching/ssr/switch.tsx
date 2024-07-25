"use client";

import { useRouter, usePathname } from "next/navigation";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SwitchIndividually() {
  const router = useRouter();
  const isChecked = usePathname().includes("fetch-individually");

  const handleOnChange = (checked: boolean) => {
    if (checked) {
      router.push(
        "/react-server-components/data-fetching/ssr/fetch-individually"
      );
    } else {
      router.push("/react-server-components/data-fetching/ssr");
    }
  };
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="fetch-individual-items"
        onCheckedChange={handleOnChange}
        checked={isChecked}
      />
      <Label htmlFor="fetch-individual-items">Fetch items individually</Label>
    </div>
  );
}
