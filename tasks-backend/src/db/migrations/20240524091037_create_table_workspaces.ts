import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("workspaces", (table) => {
    table.increments();
    table.string("name");
    table.string("company_size").defaultTo("1");
    table.string("url");
    table.string("token");
    table.string("image");
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("workspaces");
}
