import { createFolder } from "@/actions/workspace";
import { useMutationData } from "./useMutationData";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateFolders = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutationData(
    ["create-folder"],
    () => createFolder(workspaceId),
    "workspace-folders"
  );

  const onCreateNewFolder = () => {
    const tempId = `optimistic-${Date.now()}`;
    const newFolder = {
      id: tempId,
      name: "untitled",
      workSpaceId: workspaceId,
      _count: { videos: 0 }
    };

    // Optimistically update the cache
    queryClient.setQueryData(["workspace-folders"], (old: any) => {
      if (!old) {
        return {
          status: 200,
          data: [newFolder]
        };
      }
      
      if (old.status !== 200) return old;
      
      const existingData = Array.isArray(old.data) ? old.data : [];
      return {
        ...old,
        data: [...existingData, newFolder]
      };
    });
    
    // Perform the actual mutation
    mutate({ name: "untitled", id: tempId });
  };
  
  return {
    onCreateNewFolder,
  };
};
