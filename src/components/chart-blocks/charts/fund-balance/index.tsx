"use client";

import { VChart } from "@visactor/react-vchart";
import type { ILineChartSpec } from "@visactor/vchart";

const data = [
  { month: "Sep", balance: 380000 },
  { month: "Oct", balance: 420000 },
  { month: "Nov", balance: 350000 },
  { month: "Dec", balance: 410000 },
  { month: "Jan", balance: 380000 },
  { month: "Feb", balance: 430000 },
  { month: "Mar", balance: 470110 },
];

const spec: ILineChartSpec = {
  type: "line",
  data: [
    {
      id: "fund",
      values: data,
    },
  ],
  xField: "month",
  yField: "balance",
  point: {
    style: {
      fill: "#60A5FA",
      stroke: "#2563EB",
      lineWidth: 2,
    },
  },
  line: {
    style: {
      stroke: "#2563EB",
      lineWidth: 2,
    },
  },
  axes: [
    {
      orient: "left",
      label: {
        formatMethod: (value: number) =>
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(value),
      },
    },
  ],
  crosshair: {
    line: {
      style: {
        stroke: "#E5E7EB",
        lineWidth: 1,
      },
    },
  },
  tooltip: {
    mark: {
      content: [
        {
          key: (datum) => datum.month,
          value: (datum) =>
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(datum.balance),
        },
      ],
    },
  },
};

export default function FundBalanceChart() {
  return <VChart className="h-full w-full" spec={spec} />;
} 