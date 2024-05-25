import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("audit_logs", (table) => {
    table.increments("id");
    table.string("action");
    table.string("entity_type");
    table.integer("user_id");
    table.integer("workspace_id");
    // reference
    table.jsonb("ref");
    // table.integer("entity_id");
    // table.string("entity_title");
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at");

    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table
      .foreign("workspace_id")
      .references("workspaces.id")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("audit_logs");
}
