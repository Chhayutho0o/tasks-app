import {
  AnyQueryBuilder,
  Model,
  Modifiers,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { ListState, ParamsState } from "../types";

class AuditLog extends Model {
  static tableName = "audit_logs";
  static relationMappings: RelationMappings | RelationMappingsThunk = {};
  static modifiers: Modifiers<AnyQueryBuilder> = {
    filter: (query: AnyQueryBuilder, params: ParamsState) => {},
  };

  static list = async ({
    params,
    paging = { page: 0, perPage: 20 },
  }: ListState) => {
    return await AuditLog.query()
      .modify("filter", params)
      .orderBy("id", "desc")
      .page(paging.page, paging.perPage);
  };
}

export default AuditLog;
