import { chartTitle } from "@/components/primitives";
import { cn } from "@/lib/utils";

export default function MetricCard({
  title,
  value,
  className,
}: {
  title: string;
  value: string;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col", className)}>
      <h2 className={cn(chartTitle({ color: "mute", size: "md" }), "mb-2")}>
        {title}
      </h2>
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold">{value}</span>
      </div>
    </section>
  );
}
