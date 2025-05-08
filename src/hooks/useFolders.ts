"use client";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import { getWorkspaceFolders, moveVideoLocation } from "@/actions/workspace";
import useZodForm from "./useZodForm";
import { moveVideoSchema } from "@/components/forms/change-video-location/schema";

export const useMoveVideos = (videoId: string, currentWorkspace: string) => {
  const { folders } = useAppSelector((state) => state.FolderReducer);
  const { workspaces } = useAppSelector((state) => state.WorkSpaceReducer);
  const [isFetching, setIsFetching] = useState(false);
  const [isFolders, setIsFolders] = useState<
    | ({
        _count: {
          videos: number;
        };
      } & {
        id: string;
        name: string;
        workSpaceId: string | null;
        createdAt: Date;
      })[]
    | undefined
  >(undefined);
  const { mutate, isPending } = useMutationData(
    ["change-video-location"],
    (data: { filder_id: string; workspace_id: string }) =>
      moveVideoLocation(videoId, data.workspace_id, data.filder_id)
  );

  const { errors, onFormSubmit, register, watch } = useZodForm(
    moveVideoSchema,
    mutate,
    { filder_id: null, workspace_id: currentWorkspace }
  );

  const fetchFolders = async (workSpace: string) => {
    setIsFetching(true);
    const folders = await getWorkspaceFolders(workSpace);
    setIsFetching(false);
    if ("isFolders" in folders.data) {
      setIsFolders(folders.data.isFolders);
    } else {
      setIsFolders([]);
    }
  };
  useEffect(() => {
    fetchFolders(currentWorkspace);
  }, []);
  useEffect(() => {
    const workSpace = watch(async (value) => {
      if (value.workspace_id) fetchFolders(value.workspace_id);
    });
    return () => workSpace.unsubscribe();
  }, [watch]);
  return {
    onFormSubmit,
    errors,
    register,
    isPending,
    folders,
    workspaces,
    isFetching,
    isFolders,
  };
};
