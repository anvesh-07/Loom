import {
  BellDot,
  CreditCard,
  HousePlus,
  Library,
  Settings,
} from "lucide-react";
import React from "react";

export const MENU_ITEMS = (
  workspaceID: string
): { title: string; href: string; icon: React.ReactNode }[] => [
  {
    title: "Home",
    href: `/dashboard/${workspaceID}/home`,
    icon: <HousePlus />,
  },
  {
    title: "My Librarary",
    href: `/dashboard/${workspaceID}`,
    icon: <Library />,
  },
  {
    title: "Notifications",
    href: `/dashboard/${workspaceID}/notifications`,
    icon: <BellDot />,
  },
  {
    title: "Billing",
    href: `/dashboard/${workspaceID}/billing`,
    icon: <CreditCard />,
  },
  {
    title: "Settings",
    href: `/dashboard/${workspaceID}/settings`,
    icon: <Settings />,
  },
];
