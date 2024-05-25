import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("project_issue_assignees", (table) => {
    table.increments();
    table.integer("issue_id");
    table.integer("user_id");

    table
      .foreign("issue_id")
      .references("project_issues.id")
      .onDelete("CASCADE");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("project_issue_assignees");
}
