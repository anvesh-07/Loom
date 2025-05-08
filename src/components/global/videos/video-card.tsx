import React from "react";
import Loader from "../loader";
import CardMenu from "./video-card-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, Share2, User as UserIcon } from "lucide-react";

import CopyLink from "./copy-link";
import Link from "next/link";

type Props = {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string | null;
  source: string;
  processing: boolean;
  workspaceId: string;
};

const VideoCard = ({
  User,
  id,
  Folder,
  createdAt,
  title,
  source,
  processing,
  workspaceId,
}: Props) => {
  const daysAgo = Math.floor(
    (new Date().getTime() - createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );

  return (
    <Loader
      className="bg-[#171717] flex justify-center items-center border-[1px] border-[rbg(37,37,37)] rounded-xl"
      state={processing}
    >
      <div className="group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl ">
        <div className="absolute top-3 right-3 z-50 gap-x-3 hidden group-hover:flex">
          <CardMenu
            currentFolderName={Folder?.name}
            videoId={id}
            currentWorkspace={workspaceId}
            currentFolder={Folder?.id}
          />
          <CopyLink
            varients={"ghost"}
            className="p-[5px] h-5 bg-hover:bg-transparent bg-[#252525] "
            videoId={id}
          />
        </div>
        <Link
          href={`/preview/${id}`}
          className="hover:bg-[#252525] flex transition duration-150 flex-col justify-between h-ful"
        >
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          >
            <source
              src={`${process.env.NEST_PUBLIC_CLOUD_FRONT_STREAM_URL}/${source}#t-1`}
            ></source>
          </video>
          <div className="px-5 py-3 flex flex-col gap-y-2 z-20 ">
            <h2 className="text-sm font-semibold text-[#BDBDBD]">{title}</h2>
            <div className="flex gap-x-2 items-center mt-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src={User?.image as string} />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="capitalize text-[#BDBDBD] text-sm">
                  {User?.firstname} {User?.lastname}
                </p>
                <p className="text-[#6D6D6D] flex items-center text-sm">
                  <Dot /> {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="flex gap-x-1 items-center">
                <Share2 fill="#9D9D9D" className="text-[#9D9D9D]" size={12} />
                <p className="text-xs text-[#9D9D9D] capitalize">
                  {User?.firstname} &apos;s Workspace
                </p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Loader>
  );
};

export default VideoCard;
