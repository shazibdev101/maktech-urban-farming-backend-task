import prisma from "../src/lib/prisma";
import * as bcrypt from "bcrypt";

async function main() {
  console.log("Starting seeding...");

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.plant.deleteMany();
  await prisma.order.deleteMany();
  await prisma.produce.deleteMany();
  await prisma.rentalSpace.deleteMany();
  await prisma.sustainabilityCert.deleteMany();
  await prisma.vendorProfile.deleteMany();
  await prisma.communityPost.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 10);

  // 1. Create Admins
  const admin = await prisma.user.create({
    data: {
      name: "System Admin",
      email: "admin@farming.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  // 2. Create Vendors (10)
  const vendors = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: `Vendor ${i}`,
        email: `vendor${i}@example.com`,
        password: passwordHash,
        role: "VENDOR",
        vendorProfile: {
          create: {
            farmName: `Green Farm ${i}`,
            farmLocation: `Region ${i}, City Central`,
          },
        },
      },
      include: { vendorProfile: true },
    });
    vendors.push(user.vendorProfile);
  }

  // 3. Create Customers (5)
  for (let i = 1; i <= 5; i++) {
    await prisma.user.create({
      data: {
        name: `Customer ${i}`,
        email: `customer${i}@example.com`,
        password: passwordHash,
        role: "CUSTOMER",
      },
    });
  }

  // 4. Create Produce (100 items)
  console.log("Generating 100 produce items...");
  const categories = ["VEGETABLES", "FRUITS", "SEEDS", "TOOLS", "ORGANIC"];
  for (let i = 1; i <= 100; i++) {
    const vendor = vendors[Math.floor(Math.random() * vendors.length)];
    await prisma.produce.create({
      data: {
        name: `Organic ${categories[i % categories.length]} ${i}`,
        description: `This is a high-quality organic product number ${i}`,
        price: Math.floor(Math.random() * 50) + 5,
        category: categories[i % categories.length],
        availableQuantity: Math.floor(Math.random() * 50) + 10,
        vendorId: vendor!.id,
      },
    });
  }

  // 5. Create Rental Spaces (5)
  console.log("Generating rental spaces...");
  for (let i = 0; i < 5; i++) {
    await prisma.rentalSpace.create({
      data: {
        location: `Plot Area ${i + 1}, North Side`,
        size: "10x10 sqft",
        price: 200 + (i * 50),
        availability: true,
        vendorId: vendors[i % vendors.length]!.id,
      },
    });
  }

  // 6. Create Community Posts
  console.log("Generating community posts...");
  await prisma.communityPost.create({
    data: {
      userId: admin.id,
      postContent: "Welcome to the Urban Farming Community! Feel free to share your tips and tricks.",
    },
  });

  console.log("Seeding finished successfully! ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
