"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";
import { Album } from "@/lib/albums";

import Spinner from "@/public/tube-spinner.svg";
import Play from "@/public/play.svg";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  onMount?: (state: string) => void;
}

export function AlbumArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  onMount,
  ...props
}: AlbumArtworkProps) {
  const [rendering, setRendering] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const alreadyRunOnce = useRef(false);

  useEffect(() => {
    onMount?.("rendering");

    const id = setTimeout(() => {
      setRendering(false);
      onMount?.("idle");
      clearTimeout(id);
    }, 2000);

    return () => {
      clearTimeout(id);
      onMount?.("unmounting");
    };
  }, [onMount]);

  useEffect(() => {
    if (!rendering) {
      if (!loading && !alreadyRunOnce.current) {
        const id = setTimeout(() => {
          setLoading(true);
          onMount?.("mounting");
          alreadyRunOnce.current = true;
        }, 2000);
        return () => {
          clearTimeout(id);
        };
      } else {
        const id = setTimeout(
          () => {
            setLoading(false);
            onMount?.("idle");
            clearTimeout(id);
          },
          2500 + Math.random() * 2000,
        );
        return () => {
          clearTimeout(id);
        };
      }
    }
  }, [rendering, loading, onMount]);

  useEffect(() => {
    if (progress && progress < 100) {
      onMount?.("updating");
      const timeout = setTimeout(() => {
        setProgress((prev) => {
          const nextStep = prev + 5 + Math.floor(Math.random() * 18);
          return Math.min(nextStep, 100);
        });
      }, 1500);

      return () => {
        clearTimeout(timeout);
      };
    } else if (!loading && alreadyRunOnce.current) {
      onMount?.("idle");
    }
  }, [progress, onMount, loading]);

  if (rendering) {
    return (
      <div className={cn("space-y-3", className)} {...props}>
        <div className="relative rounded-md">
          <Image
            src={album.cover}
            alt={album.name}
            width={width}
            height={height}
            className={cn(
              "h-auto w-auto rounded-md object-cover blur-sm",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
            )}
          />
        </div>

        <Progress value={progress} className="mt-2 blur-sm" />

        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none blur-sm">{album.name}</h3>
          <p className="text-xs text-muted-foreground blur-sm">
            {album.artist}
          </p>
        </div>
      </div>
    );
  }

  const handleStartTrack = () => {
    if (progress) return;
    setProgress((prev) => {
      return prev + 10;
    });
  };

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div
        className={`relative rounded-md ring-4 transition-all hover:scale-[1.01] ${
          !loading && alreadyRunOnce.current && "ring-sky-600"
        } ${
          !loading && alreadyRunOnce.current && !progress && "cursor-pointer"
        }`}
        aria-disabled={loading || !alreadyRunOnce.current}
        onClick={handleStartTrack}
      >
        <Image
          src={album.cover}
          alt={album.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto rounded-md object-cover",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
          )}
        />
        {loading && (
          <Image
            src={Spinner}
            alt=""
            className="absolute left-1/3 top-1/3 -ml-4 -mt-1"
            height={120}
            width={120}
          />
        )}
        {!loading && alreadyRunOnce.current && !progress && (
          <Image
            src={Play}
            alt=""
            className="absolute left-1/3 top-1/3 -ml-4 -mt-1 select-none"
            height={120}
            width={120}
          />
        )}
      </div>

      <Progress value={progress} className="mt-2" />

      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.name}</h3>
        <p className="text-xs text-muted-foreground">{album.artist}</p>
      </div>
    </div>
  );
}
