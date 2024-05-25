import { faker } from "@faker-js/faker";
import { Knex } from "knex";
import { random, sample, upperCase } from "lodash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("project_members").del();
  await knex("projects").del();

  const workspaces = await knex("workspaces").select("*");

  for (const workspace of workspaces) {
    const projectData = [];
    const projectMembersData = [];

    for (let i = 0; i < 5; i++) {
      const projectName = faker.lorem.words({ min: 1, max: 3 });
      const projectIndentifier = faker.helpers.slugify(upperCase(projectName));
      projectData.push({
        name: projectName,
        identifier: projectIndentifier,
        cover: faker.image.url({ width: 820, height: 312 }),
        description: faker.lorem.sentence(),
        workspace_id: workspace.id,
      });
    }

    const projects = await knex("projects").insert(projectData).returning("*");
    const roles = await knex("roles").select();
    for (const project of projects) {
      const randomNumMembers = random(2, 10);
      const randomNumTags = random(1, 3);

      const users = await knex("users")
        .select("id")
        .orderByRaw("random()")
        .limit(randomNumMembers);
      for (const user of users) {
        projectMembersData.push({
          project_id: project.id,
          user_id: user.id,
          role_id: sample(roles.map((item) => item.id)),
        });
      }
    }

    if (projectMembersData.length) {
      await knex("project_members").insert(projectMembersData);
    }
  }
}
