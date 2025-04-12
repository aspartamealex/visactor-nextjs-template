import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TicketMetric = {
  date: string;
  type: "created" | "resolved";
  count: number;
};

export type FundMetric = {
  date: string;
  type: "income" | "outcome";
  amount: number;
};
