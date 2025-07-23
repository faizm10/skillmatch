import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const NUM_USERS = 10;

  for (let i = 0; i < NUM_USERS; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const bio = faker.lorem.sentence();
    const password = faker.internet.password({ length: 10 });
    const skills = faker.helpers.arrayElements(['React', 'Node.js', 'GraphQL', 'TypeScript', 'Next.js', 'Python'], 3);
    const interests = faker.helpers.arrayElements(['Hackathons', 'AI', 'Web Dev', 'Game Dev'], 2);

    await prisma.user.create({
      data: {
        name,
        email,
        username,
        bio,
        password,
        skills,
        interests,
      },
    });

    console.log(`Created user: ${name}`);
  }
}

main()
  .then(() => {
    console.log('🌱 Seeding complete');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });