"use client";

import { BarChart3, FileText, Home, MessageSquarePlus, Shield, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Owners Overview",
    href: "/owners",
    icon: Users,
  },
  {
    name: "Insurance & Levies",
    href: "/insurance-levies",
    icon: Shield,
  },
  {
    name: "Requests",
    href: "/requests",
    icon: FileText,
  },
  {
    name: "Strata Committees",
    href: "/committees",
    icon: BarChart3,
  },
  {
    name: "Create Announcement",
    href: "/announcements/create",
    icon: MessageSquarePlus,
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto p-2">
      <ul className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-x-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-slate-200 hover:text-foreground dark:hover:bg-slate-800",
                  pathname === item.href &&
                    "bg-slate-200 text-foreground dark:bg-slate-800",
                )}
              >
                <Icon size={16} />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
