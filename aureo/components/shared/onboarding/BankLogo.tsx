"use client";

import Image from "next/image";
import { useState } from "react";

export default function BankLogo({
  domain,
  name,
  size = 32,
}: {
  domain: string;
  name: string;
  size?: number;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="flex items-center justify-center rounded-lg bg-primary/20 text-primary font-bold text-xs"
        style={{ width: size, height: size }}
      >
        {name[0]}
      </div>
    );
  }

  return (
    <Image
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={name}
      width={size}
      height={size}
      className="rounded-lg object-contain"
      onError={() => setError(true)}
      unoptimized
    />
  );
}
