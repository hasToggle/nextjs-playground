import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SwitchWithLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="switchy" />
      <Label htmlFor="switchy">{label}</Label>
    </div>
  );
}
