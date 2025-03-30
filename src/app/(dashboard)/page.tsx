import { Bell, ThumbsDown, ThumbsUp } from "lucide-react";
import Container from "@/components/container";
import FundBalanceChart from "@/components/chart-blocks/charts/fund-balance";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-6 p-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Total Owners</h3>
          <div className="mt-2 flex items-end justify-between">
            <div className="text-3xl font-bold">325</div>
            <div className="text-sm text-green-600">+3 from last month</div>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Owners Insured</h3>
          <div className="mt-2 flex items-end justify-between">
            <div className="text-3xl font-bold">73%</div>
            <div className="text-sm text-green-600">+2% from last month</div>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Levies Paid</h3>
          <div className="mt-2 flex items-end justify-between">
            <div className="text-3xl font-bold">97%</div>
            <div className="text-sm text-green-600">+3% from last month</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 laptop:grid-cols-2">
        {/* Fund Balance Chart */}
        <Card className="p-4">
          <h3 className="mb-4 text-lg font-semibold">Fund Balance</h3>
          <div className="relative h-[300px]">
            <FundBalanceChart />
            <div className="absolute right-4 top-0 text-xl font-semibold">
              $470,110
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {/* Announcements */}
          <Card className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Announcements</h3>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              {/* Placeholder for announcements */}
              <div className="rounded-lg border p-3">
                <p className="text-sm text-muted-foreground">No announcements yet</p>
              </div>
            </div>
          </Card>

          {/* Owner Satisfaction */}
          <Card className="p-4">
            <h3 className="mb-4 text-lg font-semibold">Owner Satisfaction</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-green-600" />
                  <span>Satisfied</span>
                </div>
                <div className="font-semibold">85%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsDown className="h-5 w-5 text-red-600" />
                  <span>Unsatisfied</span>
                </div>
                <div className="font-semibold">15%</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
