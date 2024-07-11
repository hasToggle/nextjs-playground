"use client";

import { useState, useCallback } from "react";

import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hover } from "@/components/hover-card";

import { AlbumArtwork } from "@/components/album-artwork";
import { PodcastEmptyPlaceholder } from "@/components/podcast-empty-placeholder";
import { listenNowAlbums, madeForYouAlbums } from "@/lib/albums";

/* 
  1. follow-on from previous session: ask how we can load data when react has rendered the component
    - we can't do it using our current knowledge
    - we need something that React provides - lifecycle methods
    - lifecycle methods are methods that are called at different stages of a component's lifecycle
  2. when does React call these methods? => breakout session for 15mins
    - after rendering & when a component is created and inserted into the DOM
    - after rendering & when a component is updated
    - after rendering & when a component is removed from the DOM
    => play through the lifecycle methods with console.logs
  3. show demo of lifecycle methods
  4. exercise: use setInterval to update the progress of a track
    - use numbers to represent the progress
    - update the progress every 1 second
    - (clear the interval when the component is removed)
    - add the progress state as a dependency to the useEffect
*/

const LIFECYCLE_EVENTS: { [key: string]: string } = {
  idle: "Waiting for user interaction.",
  rendering: "Showing the image, title, and description.",
  mounting: "Connecting to the stream.",
  updating: "Fetching the next chunk of data.",
  unmounting: "Disconnecting from the stream.",
};

export default function MusicPage() {
  const [show, setShow] = useState<boolean>(false);
  const [currentState, setCurrentState] = useState<string>("idle");
  const [events, setEvents] = useState<string[]>([]);

  const handleLifecycle = useCallback(function (state: string) {
    setCurrentState(state);
    setEvents((prevEvents) => [state, ...prevEvents]);
  }, []);

  return (
    <>
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">
          <Tabs defaultValue="individual" className="h-full space-y-6">
            <div className="space-between flex items-center">
              <TabsList>
                <TabsTrigger value="individual" className="relative">
                  Individual component
                </TabsTrigger>
                <TabsTrigger value="multiple">Multiple components</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="individual"
              className="border-none p-0 outline-none"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    A day in the life of a component
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Lifecycle events on the example of a music track.
                  </p>
                </div>
              </div>
              <Separator className="mt-4 mb-8" />
              <div className="relative flex h-[450px] w-[700px] space-x-20 rounded-md border border-dashed border-gray-500">
                <span className="absolute -top-5 left-1 rounded-md px-4 font-medium">
                  {/* <SwitchWithLabel label="Show" /> */}
                  <Button
                    className="border-2 border-orange-100 hover:border-orange-950"
                    onClick={() => {
                      if (show) {
                        setShow(false);
                        setTimeout(() => handleLifecycle("idle"), 3000);
                      } else {
                        setShow(true);
                        setEvents(() => []);
                      }
                    }}
                  >
                    {show ? (
                      <EyeNoneIcon className="mr-2 h-4 w-4" />
                    ) : (
                      <EyeOpenIcon className="mr-2 h-4 w-4" />
                    )}{" "}
                    {show ? "Hide" : "Show"} component
                  </Button>
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
                      <p>But we still have to clean up. 🧹</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Lifecycle events
                </h2>
                <p className="text-sm text-muted-foreground">
                  Each individual event. Updated during the lifetime of the
                  above component.
                </p>
              </div>
              <Separator className="my-4" />
              <div className="relative">
                <ScrollArea>
                  <div className="flex space-x-4 pb-4">
                    {events.map((event, index) => (
                      <div key={event + index} className="w-[180px]">
                        <div className="border-l border-gray-300">
                          <h3 className="ml-3 mt-1 font-medium capitalize">
                            {event}
                          </h3>
                          <p className="ml-3 mt-1 text-sm">
                            {LIFECYCLE_EVENTS[event]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent
              value="multiple"
              className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    A day in the life of every component
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Every single component has its own lifecycle.
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <AlbumArtworks />
            </TabsContent>
          </Tabs>

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

function AlbumArtworks() {
  return (
    <div className="relative flex h-[450px] space-x-20 rounded-md border border-dashed border-gray-500">
      <div className="mt-10 ml-5 flex space-x-4 pb-4">
        {listenNowAlbums.map((album) => (
          <Artwork key={album.name} album={album} />
        ))}
      </div>
    </div>
  );
}

function Artwork({ album }: { album: any }) {
  const [lifecycleState, setLifecycleState] = useState<string>("idle");

  const handleState = useCallback(
    (status: any) => setLifecycleState(status),
    []
  );

  return (
    <div
      key={album.name}
      className={`relative rounded-md border border-dashed`}
    >
      <span className="absolute -top-7 left-0 rounded-md px-4 font-medium">
        {lifecycleState}
      </span>
      <AlbumArtwork
        album={album}
        className="w-[250px]"
        aspectRatio="portrait"
        width={250}
        height={330}
        onMount={handleState}
      />
    </div>
  );
}

function CodeDisplay() {
  return <div>code</div>;
}

function LifecycleState({ state = "idle" }) {
  return (
    <ul className="font-medium">
      What React is doing
      <li
        className={`font-normal rounded-md p-2 ${
          state === "idle" ? "font-semibold bg-gray-300" : ""
        }`}
      >
        Idle
      </li>
      <li
        className={`font-normal rounded-md p-2 ${
          state === "rendering" ? "font-semibold bg-orange-300" : ""
        }`}
      >
        <Hover trigger="Rendering" content="Rendering the JSX to the DOM." />
      </li>
      <li
        className={`font-normal rounded-md p-2 ${
          state === "mounting" ? "font-semibold bg-orange-300" : ""
        }`}
      >
        <Hover
          trigger="Mounting"
          content="Reacting to having added the HTML to the DOM."
        />
      </li>
      <li
        className={`font-normal rounded-md p-2 ${
          state === "updating" ? "font-semibold bg-orange-300" : ""
        }`}
      >
        <Hover trigger="Updating" content="Reacting to a change of state." />
      </li>
      <li
        className={`font-normal rounded-md p-2 ${
          state === "unmounting" ? "font-semibold bg-orange-300" : ""
        }`}
      >
        <Hover trigger="Unmounting" content="Cleaning up" />
      </li>
    </ul>
  );
}
