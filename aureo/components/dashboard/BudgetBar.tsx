export default function BudgetBar({
  label,
  spent,
  total,
  emoji,
}: {
  label: string;
  spent: number;
  total: number;
  emoji: string;
}) {
  const pct = total > 0 ? Math.min((spent / total) * 100, 100) : 0;
  const color = pct >= 100 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-emerald-500";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-medium">
          <span>{emoji}</span>
          {label}
        </span>
        <span className="text-muted-foreground">
          {spent.toLocaleString("fr-FR")} / {total.toLocaleString("fr-FR")} €
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
