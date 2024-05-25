import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("project_issue_tags", (table) => {
    table.increments();
    table.integer("issue_id");
    table.integer("tag_id");

    table
      .foreign("issue_id")
      .references("project_issues.id")
      .onDelete("CASCADE");
    table.foreign("tag_id").references("project_tags.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("project_issue_tags");
}
