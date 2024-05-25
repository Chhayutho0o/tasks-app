import { faker } from "@faker-js/faker";
import { Knex } from "knex";
import { random, sample } from "lodash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("workspace_collaborators").del();
  await knex("workspaces").del();

  const workspaceData = [];
  const collaboratorData = [];

  const COMPANY_SIZE = [
    "Just myself",
    "2-10",
    "11-50",
    "51-200",
    "201-500",
    "500+",
  ];

  for (let i = 0; i < 10; i++) {
    workspaceData.push({
      name: faker.company.name(),
      company_size: sample(COMPANY_SIZE),
      url: faker.internet.url(),
      token: faker.string.uuid(),
      image: faker.image.url({ width: 200, height: 200 }),
      created_at: faker.date.past({ years: 2 }),
    });
  }

  const workspaces = await knex("workspaces")
    .insert(workspaceData)
    .returning("*");
  const roles = await knex("roles").select("*");

  for (const workspace of workspaces) {
    const users = await knex("users")
      .select("id")
      .orderByRaw("random()")
      .limit(random(4, 10));

    for (const user of users) {
      collaboratorData.push({
        workspace_id: workspace.id,
        user_id: user.id,
        role_id: sample(roles.map((item) => item.id)),
      });
    }
  }

  await knex("workspace_collaborators").insert(collaboratorData);
}
