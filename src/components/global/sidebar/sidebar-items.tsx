import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  href: string;
  selected: boolean;
  notifications?: number;
};

const sideBarItem = ({ icon, title, href, selected, notifications }: Props) => {
  return (
    <li className="cursor-pointer my-[5px] ">
      <Link
        className={cn(
          "flex items-center justify-between group rounded-lg hover:bg-[#1D1D1D] ",
          selected ? "bg-[#1D1D1D]" : ""
        )}
        href={href}
      >
        <div className="flex items-center gap-2 transition-all p-[5px] cursor-pointer ">
          {icon}
          <span
            className={cn(
              "font-medium group-hover:text-[#9D9D9D] transition-all w-32 ",
              selected ? "text-[#9D9D9D]" : "text-[#545454"
            )}
          >
            {title}
          </span>
        </div>
        {/* {notifications && (
          <span className="bg-[#FF0000] rounded-full text-white px-2 py-1 text-sm font-medium">
            {notifications}
          </span>
        )} */}
      </Link>
    </li>
  );
};

export default sideBarItem;
