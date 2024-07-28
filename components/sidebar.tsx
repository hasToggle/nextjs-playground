"use client";

import { useRouter } from "next/navigation";
import {
  CodeXmlIcon,
  BracesIcon,
  CircleDashed,
  PowerIcon,
  DatabaseIcon,
  PuzzleIcon,
  GlobeIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Playlist } from "@/lib/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
  const router = useRouter();
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            React Basics
          </h2>
          <div className="space-y-1">
            <Button
              onClick={() => router.push("/react-basics/jsx")}
              variant="ghost"
              className="w-full justify-start"
            >
              <CodeXmlIcon className="mr-2 h-4 w-4" />
              JSX 🚧
            </Button>
            <Button
              onClick={() => router.push("/react-basics/props")}
              variant="ghost"
              className="w-full justify-start"
            >
              <BracesIcon className="mr-2 h-4 w-4" />
              Props 🚧
            </Button>
            <Button
              onClick={() => router.push("/react-basics/react-state")}
              variant="ghost"
              className="w-full justify-start"
            >
              <PowerIcon className="mr-2 h-4 w-4" />
              React State
            </Button>
            <Button
              onClick={() => router.push("/react-basics/component-lifecycle")}
              variant="ghost"
              className="w-full justify-start"
            >
              <CircleDashed className="mr-2 h-4 w-4" />
              Component Lifecycle
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            React Server Components
          </h2>
          <div className="space-y-1">
            <Button
              onClick={() =>
                router.push("/react-server-components/data-fetching")
              }
              variant="ghost"
              className="w-full justify-start"
            >
              <DatabaseIcon className="mr-2 h-4 w-4" />
              Data Fetching
            </Button>
            <Button
              onClick={() =>
                router.push("/react-server-components/server-actions")
              }
              variant="ghost"
              className="w-full justify-start"
            >
              <GlobeIcon className="mr-2 h-4 w-4" />
              Server Actions 🚧
            </Button>
            <Button
              onClick={() =>
                router.push("/react-server-components/composition-patterns")
              }
              variant="ghost"
              className="w-full justify-start"
            >
              <PuzzleIcon className="mr-2 h-4 w-4" />
              Composition Patterns 🚧
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
