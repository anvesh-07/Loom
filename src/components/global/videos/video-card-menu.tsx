import React from "react";
import Modal from "../Modal";
import { Move } from "lucide-react";
import ChangeVideoLocation from "@/components/forms/change-video-location";

type Props = {
  videoId: string;
  currentWorkspace?: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const CardMenu = ({
  videoId,
  currentWorkspace,
  currentFolder,
  currentFolderName,
}: Props) => {
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2 "
      title="Move to new workspace/folder"
      description="This Action cannot be undone. This will permanently delete the video from your workspace and remove it from all folders."
      trigger={<Move size={20} fill="#4f4f4f" className="text-[#4f4f4f]" />}
    >
      <ChangeVideoLocation
        currentFolder={currentFolder}
        currentWorkspace={currentWorkspace}
        videoId={videoId}
        currentFolderName={currentFolderName}
      />
    </Modal>
  );
};

export default CardMenu;
