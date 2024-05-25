import { Request, Response } from "express";
import { pagination, paging } from "~/app/helper/utils";
import Workspace from "~/app/models/Workspace";
import { ParamsState } from "~/app/types";

export const list = async (req: Request, res: Response) => {
  try {
    const { currentUser, query } = req;
    const page = paging(req);
    const workspaces = await Workspace.userWorkspaces({
      paging: page,
      params: query as ParamsState,
      currentUserId: currentUser.id,
    });
    const meta = pagination(workspaces.total, page.page, page.perPage);
    res.status(200).json({
      data: workspaces,
      meta,
    });
  } catch (error) {
    return res.status(400).json({ error: "Internal Server Error" });
  }
};
