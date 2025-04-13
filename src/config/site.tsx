import { 
  BarChart3, 
  ClipboardList, 
  FileText, 
  Home, 
  LayoutDashboard, 
  MessageSquare, 
  type LucideIcon, 
  Users 
} from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "Strata Management Dashboard",
  description: "Dashboard for strata management",
};

export const navigations: Navigation[] = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    href: "/",
  },
  {
    icon: Users,
    name: "Owners Overview",
    href: "/owners",
  },
  {
    icon: FileText,
    name: "Insurance & Levies",
    href: "/insurance",
  },
  {
    icon: ClipboardList,
    name: "Requests",
    href: "/requests",
  },
  {
    icon: Users,
    name: "Strata Committees",
    href: "/committees",
  },
  {
    icon: MessageSquare,
    name: "Manage Announcements",
    href: "/announcements",
  },
];
