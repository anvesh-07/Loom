import { getAllUserVideos } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import React from "react";

type Props = {
  folderId: string;
  videosKey: string;
  workspaceId: string;
};

const Videos = ({ folderId, videosKey, workspaceId }: Props) => {
  const { data: videoData } = useQueryData([videosKey], () =>
    getAllUserVideos(folderId)
  );
  return <div>Videos</div>;
};

export default Videos;
