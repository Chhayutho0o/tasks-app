import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("project_tags", (table) => {
    table.increments();
    table.integer("project_id");
    table.string("name");
    table.string("type");

    table.foreign("project_id").references("projects.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("project_tags");
}
