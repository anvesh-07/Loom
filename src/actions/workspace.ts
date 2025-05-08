"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }
    const isUserInWorkspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            member: {
              every: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });
    return {
      status: 200,
      data: { workspace: isUserInWorkspace },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 403,
      data: {
        workspace: null,
      },
    };
  }
};

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });
    if (isFolders && isFolders.length > 0) {
      return {
        status: 200,
        data: { isFolders },
      };
    }
    return {
      status: 404,
      data: [],
    };
  } catch (error) {
    console.log(error);
    return { status: 403, data: [] };
  }
};

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const videos = await client.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (videos && videos.length > 0) {
      return {
        status: 200,
        data: videos,
      };
    }
    return {
      status: 404,
    };
  } catch (error) {
    console.log("Error getting all user videos", error);
    return { status: 400 };
  }
};

export const getWorkspace = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const workspace = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });
    if (workspace) {
      return {
        status: 200,
        data: workspace,
      };
    }
  } catch (error) {
    console.log("Error getting workspace", error);
    return { status: 400 };
  }
};

export const CreateWorkspace = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const authorized = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (authorized?.subscription?.plan === "PRO") {
      const workSpace = await client.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: "PUBLIC",
            },
          },
        },
      });
      if (workSpace) {
        return {
          status: 200,
          data: "workSpace created successfully",
        };
      }
    }
    return { status: 401, data: "You are not Authorized to create workspace" };
  } catch (error) {
    console.log("Error creating workspace", error);
    return { status: 400 };
  }
};

export const renameFolder = async (folderId: string, name: string) => {
  try {
    const folder = await client.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });
    if (folder) {
      return {
        status: 200,
        data: "Folder renamed successfully",
      };
    }
    return { status: 404, data: "Folder not found" };
  } catch (error) {
    console.log("Error renaming folder", error);
    return { status: 400, data: "Opps! Some thing went wrong" };
  }
};

export const createFolder = async (workSpaceId: string) => {
  try {
    const isNewFolders = await client.workSpace.update({
      where: {
        id: workSpaceId,
      },
      data: {
        folders: {
          create: {
            name: "untitled",
          },
        },
      },
    });
    if (isNewFolders) {
      return {
        status: 200,
        message: "Folder created successfully",
      };
    }
    return { status: 400, message: "Could not create folder" };
  } catch (error) {
    console.log("Error creating folder", error);
    return { status: 400, message: "Opps! Some thing went wrong" };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const folder = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });
    if (folder)
      return {
        status: 200,
        data: folder,
      };
    return { status: 400, data: null };
  } catch (error) {
    console.log("Error getting folder info", error);
    return { status: 500, data: null };
  }
};

export const moveVideoLocation = async (
  videoId: string,
  folderId: string,
  workSpaceId: string
) => {
  try {
    const location = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        folderId: folderId || null,
        workSpaceId,
      },
    });
    if (location)
      return {
        status: 200,
        data: "Folder changed successfully",
      };
    return { status: 404, data: "workspace/folder  not found" };
  } catch (error) {
    console.log("Error moving video location", error);
    return { status: 500, data: "Oops! something went wrong" };
  }
};
