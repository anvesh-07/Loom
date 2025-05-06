import { z } from "zod";

export const workSpaceSchema = z.object({
  name: z.string().min(1, { message: "Workspace name can not be empty" }),
});
