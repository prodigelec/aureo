"use client";

export default function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i < current
              ? "bg-primary w-6"
              : i === current
              ? "bg-primary w-4"
              : "bg-white/10 w-4"
          }`}
        />
      ))}
    </div>
  );
}
