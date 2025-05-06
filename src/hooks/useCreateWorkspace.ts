import { CreateWorkspace } from "@/actions/workspace";
import { useMutationData } from "./useMutationData";
import useZodForm from "./useZodForm";
import { workSpaceSchema } from "@/components/forms/WorkspaceForm/schema";

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData(
    ["create-workspace"],
    (data: { name: string }) => CreateWorkspace(data.name),
    "user-workspaces"
  );
  const { onFormSubmit, errors, register } = useZodForm(
    workSpaceSchema,
    mutate
  );
  return {
    isPending,
    onFormSubmit,
    errors,
    register,
  };
};
