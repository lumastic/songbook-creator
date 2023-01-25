import { PrismaClient } from "@prisma/client";
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
