import {
  AnyQueryBuilder,
  Model,
  Modifiers,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { ListState, ParamsState } from "../types";

class Issue extends Model {
  static tableName = "project_issues";
  static relationMappings: RelationMappings | RelationMappingsThunk = {};
  static modifiers: Modifiers<AnyQueryBuilder> = {
    filter: (query: AnyQueryBuilder, params: ParamsState) => {},
  };

  static list = async ({
    params,
    paging = { page: 0, perPage: 20 },
  }: ListState) => {
    return await Issue.query()
      .modify("filter", params)
      .orderBy("id", "desc")
      .page(paging.page, paging.perPage);
  };
}

export default Issue;
