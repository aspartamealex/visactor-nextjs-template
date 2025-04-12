"use client";

import { useAtomValue } from "jotai";
import { DollarSign } from "lucide-react";
import { fundBalanceDataAtom } from "@/lib/atoms";
import type { FundMetric } from "@/types/types";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";
import { DatePickerWithRange } from "./components/date-range-picker";
import MetricCard from "./components/metric-card";

const calMetricCardValue = (
  data: FundMetric[],
  type: "income" | "outcome",
) => {
  const filteredData = data.filter((item) => item.type === type);
  return Math.round(
    filteredData.reduce((acc, curr) => acc + curr.amount, 0)
  );
};

export default function FundBalance() {
  const fundBalanceData = useAtomValue(fundBalanceDataAtom);
  const totalIncome = calMetricCardValue(fundBalanceData, "income");
  const totalOutcome = calMetricCardValue(fundBalanceData, "outcome");

  return (
    <section className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ChartTitle title="Fund Balance" icon={DollarSign} />
        <DatePickerWithRange className="" />
      </div>
      <div className="flex flex-wrap">
        <div className="my-4 flex w-52 shrink-0 flex-col justify-center gap-6">
          <MetricCard
            title="Total Income"
            value={totalIncome}
            color="#60C2FB"
          />
          <MetricCard
            title="Total Outcome"
            value={totalOutcome}
            color="#3161F8"
          />
        </div>
        <div className="relative h-96 min-w-[320px] flex-1">
          <Chart />
        </div>
      </div>
    </section>
  );
} 