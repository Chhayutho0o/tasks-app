import {
  AnyQueryBuilder,
  Model,
  Modifiers,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { ListState, ParamsState } from "../types";

class Workspace extends Model {
  static tableName = "workspaces";
  static relationMappings: RelationMappings | RelationMappingsThunk = {
    workspaceCollaborators: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + "/WorkspaceCollaborator",
      join: {
        from: "workspaces.id",
        to: "workspace_collaborators.workspace_id",
      },
    },
  };
  static modifiers: Modifiers<AnyQueryBuilder> = {
    filter: (query: AnyQueryBuilder, params: ParamsState) => {
      if (params.user_id) {
        query.joinRelated("workspaceCollaborators");
      }
    },
    modifyId: (query: AnyQueryBuilder, id: string) => {
      query.findById(id);
    },
  };

  static list = async ({
    params,
    paging = { page: 0, perPage: 20 },
  }: ListState) => {
    return await Workspace.query()
      .modify("filter", params)
      .orderBy("id", "desc")
      .page(paging.page, paging.perPage);
  };

  static userWorkspaces = async ({
    params,
    paging = { page: 0, perPage: 20 },
    currentUserId,
  }: ListState) => {
    return await Workspace.query()
      .modify("filter", params)
      .orderBy("id", "desc")
      .page(paging.page, paging.perPage);
  };
}

export default Workspace;
