import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { chartTitle } from "@/components/primitives";
import { cn } from "@/lib/utils";

export default function MetricCard({
  title,
  value,
  change,
  className,
}: {
  title: string;
  value: string;
  change: number;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col", className)}>
      <h2 className={cn(chartTitle({ color: "mute", size: "md" }), "mb-2")}>
        {title}
      </h2>
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold">{value}</span>
        <ChangeIndicator change={change} />
      </div>
      <div className="text-sm text-muted-foreground">Compare to last month</div>
    </section>
  );
}

function ChangeIndicator({ change }: { change: number }) {
  return (
    <span
      className={cn(
        "flex items-center rounded-sm px-1.5 py-0.5 text-sm text-muted-foreground",
        change > 0
          ? "bg-green-50 text-green-500 dark:bg-green-950"
          : "bg-red-50 text-red-500 dark:bg-red-950",
      )}
    >
      {change > 0 ? "+" : ""}
      {Math.round(change * 100)}%
      {change > 0 ? (
        <ArrowUpRight className="ml-0.5 inline-block h-4 w-4" />
      ) : (
        <ArrowDownRight className="ml-0.5 inline-block h-4 w-4" />
      )}
    </span>
  );
}
