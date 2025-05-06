"use client";
import { getWorkspace } from "@/actions/workspace";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { NotificationProps, WorkspaceProps } from "@/types/index.type";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Modal from "../Modal";
import { Menu, PlusCircle } from "lucide-react";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import SideBarItem from "./sidebar-items";
import { getNotifications } from "@/actions/user";
import WorkspacePlaceholder from "./WorkspacePlaceholder";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import InfoBar from "../Info-bar";
import { useQueryData } from "@/hooks/useQueryData";

type Props = {
  actionWorkspaceId: string;
};

const Sidebar = ({ actionWorkspaceId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkspace);
  const { data: workspace } = data as WorkspaceProps;
  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getNotifications
  );
  const { data: count } = notifications as NotificationProps;
  const menuItems = MENU_ITEMS(actionWorkspaceId);
  const currentWorspace = workspace.workspace.find(
    (s) => s.id === actionWorkspaceId
  );
  const onChangeActiveWorkspce = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  const SidebarSection = (
    <>
      <div className="bg-[#111111] float-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden ">
        <div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 flex">
          <Image src="/opal-logo.svg" height={30} width={30} alt="Logo" />
          <p className="text-2xl">Opal</p>
        </div>
        <Select
          defaultValue={actionWorkspaceId}
          onValueChange={onChangeActiveWorkspce}
        >
          <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
            <SelectValue placeholder="select a workspace"></SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-[#111111] backdrop-blur-xl ">
            <SelectGroup>
              <SelectLabel>Workspaces</SelectLabel>
              <Separator />
              {workspace.workspace.map((workspace) => (
                <SelectItem key={workspace.id} value={workspace.id}>
                  {workspace.name}
                </SelectItem>
              ))}
              {workspace.members.length > 0 &&
                workspace.members.map(
                  (workspace) =>
                    workspace.Workspace && (
                      <SelectItem
                        value={workspace.Workspace.id}
                        key={workspace.Workspace.id}
                      >
                        {workspace.Workspace.name}
                      </SelectItem>
                    )
                )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {currentWorspace?.type === "PUBLIC" &&
          workspace.subscription?.plan === "PRO" && (
            <Modal
              title="Invite To Workspace"
              description="Invite a friend to join your workspace. They will receive an email invitation."
              trigger={
                <span className="text-sm cursor-pointer flex items-center justify-center border-t-neutral-800/ h70over:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2 ">
                  <PlusCircle
                    size={15}
                    className="text-neutral-800/90 fill-neutral-500 "
                  />
                  <span className="text-neutral-400 font-semibold text-xs">
                    Invite to Workspace
                  </span>
                </span>
              }
            >
              <Search workspaceId={actionWorkspaceId} />
            </Modal>
          )}
        <p className="w-full text-[#9D9D9D] font-bold mt-4 ">Menu</p>
        <nav className="w-full">
          <ul>
            {menuItems.map((item) => (
              <SideBarItem
                href={item.href}
                icon={item.icon}
                selected={pathName === item.href}
                title={item.title}
                key={item.title}
                notifications={
                  (item.title === "Notifications" &&
                    count._count &&
                    count._count.notification) ||
                  0
                }
              />
            ))}
          </ul>
        </nav>
        <Separator className="w-4/5" />
        <p className="w-full text-[#9D9D9D] font-bold mt-4 "> Workspaces</p>
        {workspace.workspace.length === 1 && workspace.members.length === 0 && (
          <div className="w-full mt-[-10px]">
            <p className="text-[#3c3c3c] font-medium text-sm ">
              {workspace.subscription?.plan === "FREE"
                ? "Upgrade to create workspaces"
                : "No Workspaces"}
            </p>
          </div>
        )}
        <nav className="w-full">
          <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer ">
            {workspace.workspace.length > 0 &&
              workspace.workspace.map(
                (item) =>
                  item.type !== "PERSONAL" && (
                    <SideBarItem
                      href={`/dahbaord/${item.id}`}
                      selected={pathName === `/dahbaord/${item.id}`}
                      title={item.name}
                      notifications={0}
                      key={item.name}
                      icon={
                        <WorkspacePlaceholder>
                          {item.name.charAt(0)}
                        </WorkspacePlaceholder>
                      }
                    />
                  )
              )}
            {workspace.members.length > 0 &&
              workspace.members.map((item) => (
                <SideBarItem
                  href={`/dahbaord/${item.Workspace.id}`}
                  selected={pathName === `/dahbaord/${item.Workspace.id}`}
                  title={item.Workspace.name}
                  notifications={0}
                  key={item.Workspace.name}
                  icon={
                    <WorkspacePlaceholder>
                      {item.Workspace.name.charAt(0)}
                    </WorkspacePlaceholder>
                  }
                />
              ))}
          </ul>
        </nav>
        <Separator className="w-4/5" />
        {workspace.subscription?.plan === "FREE" && (
          <GlobalCard
            title="Upgarde to Pro"
            description="Unlock AI featuures like transcription, AI summary, and more."
          >
            <Button className="text-sm w-full mt-2">
              <Loader state={false}>Upgrade</Loader>
            </Button>
          </GlobalCard>
        )}
      </div>
    </>
  );
  return (
    <div className="full">
      <InfoBar />
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button className="mt-[2px]" variant={"ghost"}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidebar;
