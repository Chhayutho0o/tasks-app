import { faker } from "@faker-js/faker";
import { Knex } from "knex";
import { random, sample } from "lodash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("project_issues").del();

  const projects = await knex("projects").select();

  for (const project of projects) {
    const issueData = [];

    const randomNumIssues = random(2, 20);
    for (let i = 0; i < randomNumIssues; i++) {
      issueData.push({
        title: faker.lorem.sentence({ min: 3, max: 6 }),
        description: faker.lorem.sentence(),
        project_id: project.id,
        project_identifier: `${project.identifier}-${i + 1}`,
      });
    }

    if (issueData.length) {
      await knex("project_issues").insert(issueData).returning("id");
    }
  }
}
