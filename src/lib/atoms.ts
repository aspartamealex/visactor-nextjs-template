import { addDays, endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { atom } from "jotai";
import type { DateRange } from "react-day-picker";
import { averageTicketsCreated } from "@/data/average-tickets-created";
import { fundBalance } from "@/data/fund-balance";
import type { FundMetric, TicketMetric } from "@/types/types";

// Default date range for the fund balance chart: April 1, 2024 to March 31, 2025
const defaultStartDate = new Date(2024, 3, 1); // April 1, 2024
const defaultEndDate = new Date(2025, 2, 31); // March 31, 2025

export const dateRangeAtom = atom<DateRange | undefined>({
  from: defaultStartDate,
  to: defaultEndDate,
});

export const ticketChartDataAtom = atom((get) => {
  const dateRange = get(dateRangeAtom);

  if (!dateRange?.from || !dateRange?.to) return [];

  const startDate = startOfDay(dateRange.from);
  const endDate = endOfDay(dateRange.to);

  return averageTicketsCreated
    .filter((item) => {
      const [year, month, day] = item.date.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return isWithinInterval(date, { start: startDate, end: endDate });
    })
    .flatMap((item) => {
      const res: TicketMetric[] = [
        {
          date: item.date,
          type: "resolved",
          count: item.resolved,
        },
        {
          date: item.date,
          type: "created",
          count: item.created,
        },
      ];
      return res;
    });
});

export const fundBalanceDataAtom = atom((get) => {
  const dateRange = get(dateRangeAtom);

  if (!dateRange?.from || !dateRange?.to) return [];

  const startDate = startOfDay(dateRange.from);
  const endDate = endOfDay(dateRange.to);

  return fundBalance
    .filter((item) => {
      const [year, month] = item.date.split("-").map(Number);
      const date = new Date(year, month - 1, 1);
      return isWithinInterval(date, { start: startDate, end: endDate });
    })
    .flatMap((item) => {
      const res: FundMetric[] = [
        {
          date: item.date,
          type: "income",
          amount: item.income,
        },
        {
          date: item.date,
          type: "outcome",
          amount: item.outcome,
        },
      ];
      return res;
    });
});
