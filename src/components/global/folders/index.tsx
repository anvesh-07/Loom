"use client";
import { cn } from "@/lib/utils";
import { ArrowRight, Folder as FolderIcon } from "lucide-react";
import React from "react";
import Folder from "./folder";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaceFolders } from "@/actions/workspace";
import { useMutationdataState } from "@/hooks/useMutationData";

type Props = {
  workspaceId: string;
};

export type FolderProps = {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    workSpaceId: string | null;
  })[];
};

const Folders = ({ workspaceId }: Props) => {
  const { data, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders(workspaceId)
  );
  const { latestVarables } = useMutationdataState(["create-folder"]);
  const { status, data: folders } = data as FolderProps;
  // if (isFetched && folders) {

  // }
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2 ">
          <FolderIcon fill="#BDBDBD" />
          <h2 className="text-[#BDBDBD] text-xl">Folder</h2>
        </div>
        <div className="flex items-center gap-2 ">
          <p className="text-[#BDBDBD]  font-semibold">See All</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <section
        className={cn(
          status !== 200 && "justify-center",
          "flex items-center gap-4 overflow-x-auto w-full"
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300 ">No Folders in Workspace</p>
        ) : (
          <>
            {latestVarables && latestVarables.status === "pending" && (
              <Folder
                name={latestVarables.variables.name}
                id={latestVarables.variables.id}
                optimistic
              />
            )}
            {folders.map((folder) => (
              <Folder
                name={folder.name}
                count={folder._count.videos}
                id={folder.id}
                key={folder.id}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
