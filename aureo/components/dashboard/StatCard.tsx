import type { ElementType } from "react";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export type StatCardProps = {
  label: string;
  value: string;
  sub: string;
  icon: ElementType;
  iconColor: string;
  iconBg: string;
  trend?: { value: string; positive: boolean } | null;
};

export default function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  iconColor,
  iconBg,
  trend,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border/30 bg-card p-5 flex flex-col gap-4 hover:border-border/60 transition-colors">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        {trend ? (
          <span
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
              trend.positive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
            }`}
          >
            {trend.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend.value}
          </span>
        ) : (
          <span className="text-[10px] text-muted-foreground/40 px-2 py-1 rounded-lg bg-white/5">
            Aucune donnée
          </span>
        )}
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="text-2xl font-black tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{sub}</p>
      </div>
    </div>
  );
}
