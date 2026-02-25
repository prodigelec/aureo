import type { ReactNode } from "react";

export default function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/30 bg-card flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
        <h2 className="font-bold text-sm">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}
