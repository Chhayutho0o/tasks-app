import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("workspace_collaborators", (table) => {
    table.increments();
    table.integer("workspace_id");
    table.integer("user_id");
    table.integer("role_id");

    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.foreign("role_id").references("roles.id").onDelete("CASCADE");
    table
      .foreign("workspace_id")
      .references("workspaces.id")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("workspace_collaborators");
}
