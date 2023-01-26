import { PrismaClient } from "@prisma/client";

import { createMockSong } from "@/test/factories/song.factory";

const prisma = new PrismaClient();
async function main() {
  const keith = await prisma.user.upsert({
    where: { email: "Keith@troyandabedinthemorning.biz" },
    update: {},
    create: {
      email: "Keith@troyandabedinthemorning.biz",
      name: "Keith",
    },
  });
  const drew = await prisma.user.upsert({
    where: { email: "Drew@troyandabedinthemorning.biz" },
    update: {},
    create: {
      email: "Drew@troyandabedinthemorning.biz",
      name: "Drew",
    },
  });
  const keithFullAuth = await prisma.user.upsert({
    where: { email: "keithrstolte+setlist-test1@gmail.com" },
    update: {},
    create: {
      email: "keithrstolte+setlist-test1@gmail.com",
      name: "Keith Full Auth Flow",
    },
  });
  await prisma.category.create({ data: { name: "Sea Shanties" } });
  await prisma.category.create({ data: { name: "New American Americana" } });
  await prisma.category.create({ data: { name: "Folk" } });
  await prisma.category.create({ data: { name: "Protest" } });
  await prisma.category.create({
    data: { name: "Really makes you go hmmmmm." },
  });
  await prisma.category.create({
    data: { name: "Really makes you go hummmmm." },
  });
  const mockedSong = createMockSong();
  await prisma.song.create({
    data: {
      ...mockedSong,
      id: 1,
      authorId: 3,
    },
  });
  // await prisma.category.upsert
  console.log({ keith, drew, keithFullAuth });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
