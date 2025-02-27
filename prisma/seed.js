const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: "Alice",
    },
  });

  console.log("Customer created", createdCustomer);

  // Add your code here
  const createdContact = await prisma.contact.create({
    data: {
      phone: "01234567890",
      email: "AliceBob@gmail.com",
      customer: {
        connect: { id: 1 },
      },
    },
  });

  console.log("Contact created", createdContact);

  //   const createdMovie = await prisma.movie.create({
  //     data: {
  //       title: "The Life Of Oli",
  //       runtimeMins: 640,
  //     },
  //   });

  //   console.log("Movie created", createdMovie);

  const createdScreen = await prisma.screen.create({
    data: {
      number: 1,
      screening: {
        create: {
          startsAt: new Date("2023-03-23 09:00:00"),
          movie: {
            create: {
              title: "The Life Of Oli",
              runtimeMins: 640,
            },
          },
        },
      },
    },
    include: {
      screening: {
        include: {
          movie: true,
        },
      },
    },
  });

  console.log("Screen created", createdScreen);

  const createdTicket = await prisma.ticket.create({
    data: {
      customer: {
        connect: { id: 1 },
      },
      screening: {
        connect: { id: 1 },
      },
    },
  });

  console.log("Ticket created", createdTicket);

  // const createdScreening = await prisma.screening.create({
  //   data: {
  //     startsAt: new Date("2023-03-23 09:00:00"),
  //     movie: {
  //       connect: { id: 1 },
  //     },
  //     screen: {
  //       connect: { id: 1 },
  //     },
  //   },
  // });

  // console.log("Screening created", createdScreening);

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
