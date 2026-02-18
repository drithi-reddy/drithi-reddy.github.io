"use client";

import Image from "next/image";
import { JUSTICE_IMAGES } from "@/lib/justice-images";
import { useState } from "react";

interface JusticeImageProps {
  justiceId: number;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: "h-32 w-full",
  md: "h-48 w-48",
  lg: "h-64 w-64",
};

export function JusticeImage({ justiceId, name, size = "md", className = "" }: JusticeImageProps) {
  const [error, setError] = useState(false);
  const src = JUSTICE_IMAGES[justiceId];

  if (error || !src) {
    return (
      <div
        className={`flex items-center justify-center rounded-md bg-ink/5 text-4xl text-ink/30 ${sizeClasses[size]} ${className}`}
      >
        ⚖
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-md bg-ink/5 ${sizeClasses[size] || sizeClasses.md} ${className}`}>
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover object-top"
        sizes={size === "lg" ? "256px" : size === "md" ? "192px" : "100%"}
        onError={() => setError(true)}
        unoptimized
      />
    </div>
  );
}
