import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("project_members", (table) => {
    table.increments();
    table.integer("project_id");
    table.integer("user_id");
    table.integer("role_id");

    table.foreign("project_id").references("projects.id").onDelete("CASCADE");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.foreign("role_id").references("roles.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("project_members");
}
