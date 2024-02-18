import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";

faker.seed(123);

async function main() {
  for (let i = 0; i < 1000; i++) {
    let firstname = faker.person.firstName();
    let lastname = faker.person.lastName();
    await prisma.user.create({
      data: {
        name: `${firstname} ${lastname}`,
        email: faker.internet.email(firstname, lastname),
      },
    });
  }
}

main();
