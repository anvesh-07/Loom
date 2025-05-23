"use client";
import { cn } from "@/lib/utils";
import { ArrowRight, FolderIcon } from "lucide-react";
import Folder from "./folder";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaceFolders } from "@/actions/workspace";
import { useMutationdataState } from "@/hooks/useMutationData";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/redux/slices/folders";

type Props = {
  workspaceId: string;
};

export type FolderProps = {
  status: number;
  data: {
    isFolders: ({
      _count: {
        videos: number;
      };
    } & {
      id: string;
      name: string;
      workSpaceId: string | null;
    })[];
  };
};

const Folders = ({ workspaceId }: Props) => {
  const despatch = useDispatch();
  const { data, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders(workspaceId)
  );

  const { latestVarables } = useMutationdataState(["create-folder"]);

  const responseData = data as FolderProps | undefined;

  const foldersList = responseData?.data?.isFolders || [];
  const { status, data: folders } = data as FolderProps;

  if (isFetched && folders) {
    despatch(FOLDERS({ folders: folders.isFolders }));
  }

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
            {Array.isArray(foldersList) &&
              foldersList.map((folder) => (
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
