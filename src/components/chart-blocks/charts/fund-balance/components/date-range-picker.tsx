"use client";

import { format, parseISO } from "date-fns";
import { useAtom } from "jotai";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fundBalance } from "@/data/fund-balance";
import { dateRangeAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [dateRange, setDateRange] = useAtom(dateRangeAtom);

  // Set the first available date to January 1, 2023
  const firstAvailableDate = new Date(2023, 0, 1);
  
  // Set the last available date to March 31, 2025
  const lastAvailableDate = new Date(2025, 2, 31);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[276px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            fromDate={firstAvailableDate}
            toDate={lastAvailableDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
} 