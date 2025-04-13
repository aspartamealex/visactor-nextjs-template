"use client"

import {
  Announcements,
  CustomerSatisfication,
  FundBalance,
  Metrics,
} from "@/components/chart-blocks";
import Container from "@/components/container";

export default function Dashboard() 
{
  return (
    <div>
      <Metrics />
      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-3 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-2">
          <FundBalance />
        </Container>
        <Container className="py-4 laptop:col-span-1">
          <Announcements />
        </Container>
      </div>
      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-1 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-1">
          <CustomerSatisfication />
        </Container>
      </div>
    </div>
  )
}
