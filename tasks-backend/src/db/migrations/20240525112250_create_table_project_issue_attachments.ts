import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("project_issue_attachments", (table) => {
    table.increments();
    table.integer("issue_id");
    table.string("file_name");
    table.string("file_path");

    table
      .foreign("issue_id")
      .references("project_issues.id")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("project_issue_attachments");
}
