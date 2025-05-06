/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Folder as FolderIcon } from "lucide-react";

import React, { useRef, useState } from "react";
import Loader from "../loader";
import { useMutationData, useMutationdataState } from "@/hooks/useMutationData";
import { renameFolder } from "@/actions/workspace";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ name, id, optimistic, count }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);
  const pathName = usePathname();
  const router = useRouter();
  const [onRename, setOnRename] = useState(false);

  const Rename = () => setOnRename(true);
  const Renamed = () => setOnRename(false);

  const { mutate, isPending } = useMutationData(
    ["rename-folders"],
    (data: { name: string }) => renameFolder(id, data.name),
    "workspace-folders",
    Renamed
  );
  const { latestVarables } = useMutationdataState(["rename-folders"]);

  const handleFolderClick = () => {
    router.push(`${pathName}/folder/${id}`);
  };
  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    Rename();
  };
  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current && folderCardRef.current) {
      if (inputRef.current.value) {
        mutate({ name: inputRef.current.value, id });
      } else Renamed();
    }
  };
  return (
    <div
      onClick={handleFolderClick}
      ref={folderCardRef}
      className={cn(
        optimistic && " opacity-60",
        "flex items-center justify-between gap-2 min-w-[250px] py-4 px-4 rounded-lg border border-neutral-600 cursor-pointer transition duration-150 hover:bg-neutral-700 "
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px] ">
          {onRename ? (
            <Input
              onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                updateFolderName(e)
              }
              autoFocus
              placeholder={name}
              className="border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0"
              ref={inputRef}
            />
          ) : (
            <p
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-300"
              onDoubleClick={handleNameDoubleClick}
            >
              {latestVarables &&
              latestVarables.status === "pending" &&
              latestVarables.variables.id === id
                ? latestVarables.variables.name
                : name}
            </p>
          )}
          <span className="text-sm text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
      <FolderIcon fill="#BDBDBD" />
    </div>
  );
};
export default Folder;
