"use client";

import { useAtomValue } from "jotai";
import { VChart } from "@visactor/react-vchart";
import type { IBarChartSpec } from "@visactor/vchart";
import { fundBalanceDataAtom } from "@/lib/atoms";
import type { FundMetric } from "@/types/types";

const generateSpec = (data: FundMetric[]): IBarChartSpec => ({
  type: "bar",
  data: [
    {
      id: "barData",
      values: data,
    },
  ],
  xField: "date",
  yField: "amount",
  seriesField: "type",
  padding: [10, 0, 10, 0],
  legends: {
    visible: true,
    orient: "top",
    position: "end",
  },
  stack: false,
  tooltip: {
    trigger: ["click", "hover"],
    formatter: "${amount}",
  },
  bar: {
    state: {
      hover: {
        outerBorder: {
          distance: 2,
          lineWidth: 2,
        },
      },
    },
    style: {
      cornerRadius: [12, 12, 12, 12],
      zIndex: (datum) => {
        return datum.type === "outcome" ? 2 : 1;
      },
    },
  },
  axes: [
    {
      orient: "left",
      title: {
        visible: true,
        text: "Money (AUD$)",
      },
      label: {
        formatter: "$",
      },
      scale: {
        nice: true,
        tickCount: 5,
      },
      tick: {
        values: [0, 20000, 40000, 60000, 80000, 100000],
      },
    },
  ],
});

export default function Chart() {
  const fundBalanceData = useAtomValue(fundBalanceDataAtom);
  const spec = generateSpec(fundBalanceData);
  return <VChart spec={spec} />;
} 