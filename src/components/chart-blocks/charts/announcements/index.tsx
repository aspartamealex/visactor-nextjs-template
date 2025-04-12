"use client";

import { Bell } from "lucide-react";
import ChartTitle from "../../components/chart-title";

export default function Announcements() {
  return (
    <section className="flex h-full flex-col gap-2">
      <ChartTitle title="Announcements" icon={Bell} />
      <div className="flex flex-col gap-4 p-4">
        <AnnouncementItem 
          title="Reminder: Levy Payment Due" 
          date="2 April, 2025" 
          description="All owners are reminded to ensure their monthly levies are paid by April 30th to avoid late fees. Thank you for your cooperation."
          priority="Owners"
        />
        <AnnouncementItem 
          title="Committee Meeting Agenda" 
          date="10 April, 2025" 
          description="Committee members are requested to submit the final election form for the May general meeting by April 27th."
          priority="Committee"
        />
      </div>
    </section>
  );
}


function AnnouncementItem({ 
  title, 
  date, 
  description, 
  priority 
}: { 
  title: string; 
  date: string; 
  description: string; 
  priority: "Committee" | "Owners" | "low" 
}) {
  const priorityColors = {
    Committee: "bg-blue-100 text-blue-800 border-blue-200",
    Owners: "bg-gray-100 text-gray-800 border-gray-200",
    low: "bg-green-100 text-green-800 border-green-200"
  };

  return (
    <div className="rounded-lg border p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <span className={`rounded-full px-2 py-1 text-xs font-medium ${priorityColors[priority]}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{date}</p>
      <p className="mt-2 text-sm">{description}</p>
    </div>
  );
} 