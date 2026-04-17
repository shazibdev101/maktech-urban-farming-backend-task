import prisma from "../lib/prisma";

export const addPlant = async (orderId: string, plantData: any) => {
  return await prisma.plant.create({
    data: {
      ...plantData,
      orderId,
    },
  });
};

export const updatePlantHealth = async (plantId: string, userId: string, updateData: any) => {
  // Ensure the plant belongs to an order owned by this user
  const plant = await prisma.plant.findFirst({
    where: { 
      id: plantId,
      order: { userId }
    },
  });

  if (!plant) {
    throw new Error("Plant not found or unauthorized");
  }

  return await prisma.plant.update({
    where: { id: plantId },
    data: updateData,
  });
};

export const getDashboardData = async (userId: string) => {
  return await prisma.order.findMany({
    where: { 
      userId,
      rentalSpaceId: { not: null } // Only leased plots
    },
    include: {
      rentalSpace: true,
      plants: true,
    },
  });
};

export const getPlantById = async (plantId: string, userId: string) => {
  return await prisma.plant.findFirst({
    where: { 
      id: plantId,
      order: { userId }
    },
  });
};
