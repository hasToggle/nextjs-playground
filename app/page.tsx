"use client";

import { useState, useCallback } from "react";

import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AlbumArtwork } from "@/components/album-artwork";
import { PodcastEmptyPlaceholder } from "@/components/podcast-empty-placeholder";
import { listenNowAlbums, madeForYouAlbums } from "@/lib/albums";

export default function MusicPage() {
  const [show, setShow] = useState(false);
  const [currentState, setCurrentState] = useState("idle");

  const handleLifecycle = useCallback(function (state: string) {
    setCurrentState(state);
  }, []);

  return (
    <>
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">
          <Button
            onClick={() => {
              if (show) {
                setShow(false);
                setTimeout(() => setCurrentState("idle"), 3000);
              } else {
                setShow(true);
              }
            }}
          >
            {show ? (
              <EyeNoneIcon className="mr-2 h-4 w-4" />
            ) : (
              <EyeOpenIcon className="mr-2 h-4 w-4" />
            )}{" "}
            {show ? "Hide" : "Show"} album
          </Button>
          <Separator className="my-4" />
          <div className="relative flex h-[450px] shrink-0 items-center justify-evenly rounded-md border border-dashed border-gray-500">
            <span className="absolute -top-3 left-3 bg-orange-200 rounded-md px-4 font-medium">
              {currentState}
            </span>
            <div className="flex max-w-[420px] flex-col items-center justify-center">
              <LifecycleState state={currentState} />
              {/* <CodeDisplay /> */}
            </div>
            <div className="flex max-w-[420px] flex-col items-center justify-center">
              {show && (
                <AlbumArtwork
                  key={"React Sounds"}
                  album={{
                    name: "React Rendezvous",
                    artist: "Ethan Byte",
                    cover:
                      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
                  }}
                  className="mt-3 w-[250px]"
                  aspectRatio="portrait"
                  width={250}
                  height={330}
                  onMount={handleLifecycle}
                />
              )}
              {!show && currentState === "unmounting" && (
                <div>
                  <p>The component is gone.</p>
                  <p>But we still have to clean up 🧹</p>
                </div>
              )}
            </div>
          </div>
          {/* <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                New Episodes
              </h2>
              <p className="text-sm text-muted-foreground">
                Your favorite podcasts. Updated daily.
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <PodcastEmptyPlaceholder /> */}
        </div>
      </div>
    </>
  );
}

function CodeDisplay() {
  return <div>code</div>;
}

function LifecycleState({ state = "idle" }) {
  return (
    <ul>
      <li
        className={`rounded-md p-2 ${
          state === "idle" ? "font-medium bg-gray-300" : ""
        }`}
      >
        Idle
      </li>
      <li
        className={`rounded-md p-2 ${
          state === "rendering" ? "font-medium bg-orange-300" : ""
        }`}
      >
        Rendering
      </li>
      <li
        className={`rounded-md p-2 ${
          state === "mounting" ? "font-medium bg-orange-300" : ""
        }`}
      >
        useEffect - on Mount
      </li>
      <li
        className={`rounded-md p-2 ${
          state === "unmounting" ? "font-medium bg-orange-300" : ""
        }`}
      >
        useEffect - on Unmount
      </li>
    </ul>
  );
}
