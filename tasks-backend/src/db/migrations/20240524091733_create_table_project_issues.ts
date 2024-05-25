import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("project_issues", (table) => {
    table.increments();
    table.integer("project_id");
    table.string("project_identifier");
    table.string("title");
    table.text("description");
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at");

    table.foreign("project_id").references("projects.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("project_issues");
}
