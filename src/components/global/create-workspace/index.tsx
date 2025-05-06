"use client";

import { getWorkspace } from "@/actions/workspace";

import React from "react";
import Modal from "../Modal";
import { useQueryData } from "@/hooks/useQueryData";
import { FolderPlus } from "lucide-react";
import WorkspaceForm from "@/components/forms/WorkspaceForm";

type Props = {};

const CreateWorkspace = (props: Props) => {
  const { data } = useQueryData(["user-workspaces"], getWorkspace);
  const { data: plan } = data as {
    status: number;
    data: {
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    };
  };
  if (plan.subscription?.plan === "FREE") {
    return <></>;
  }
  if (plan.subscription?.plan === "PRO") {
    return (
      <Modal
        title="Create Workspace"
        description="Workspace helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself"
        trigger={
          <button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-2 px-4 rounded-2xl ">
            <FolderPlus color="#707070" />
          </button>
        }
      >
        <WorkspaceForm />
      </Modal>
    );
  }
};

export default CreateWorkspace;
