import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("projects", (table) => {
    table.increments();
    table.string("name");
    table.string("identifier");
    table.string("cover");
    table.string("description");
    table.boolean("is_archive").defaultTo(false);
    table.integer("workspace_id");
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at");
    table.dateTime("deleted_at");

    table
      .foreign("workspace_id")
      .references("workspaces.id")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("projects");
}
