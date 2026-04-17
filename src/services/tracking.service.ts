import prisma from "../lib/prisma";

/**
 * Adds a new plant record to a specific garden plot booking (order).
 * @param orderId - ID of the order/booking where the plant is located.
 * @param plantData - Object containing species, health, and growth stage.
 */
export const addPlant = async (orderId: string, plantData: any) => {
  return await prisma.plant.create({
    data: {
      ...plantData,
      orderId,
    },
  });
};

/**
 * Updates the health or growth status of a tracked plant.
 * Verifies that the plant belongs to an order owned by the requesting user.
 * @param plantId - ID of the plant.
 * @param userId - ID of the user owning the plot.
 * @param updateData - Object containing healthStatus or growthStage.
 */
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

/**
 * Retrieves all leased plots and their associated plants for a user's dashboard.
 * @param userId - ID of the user.
 */
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

/**
 * Retrieves a single plant record by ID, with ownership verification.
 * @param plantId - ID of the plant.
 * @param userId - ID of the user.
 */
export const getPlantById = async (plantId: string, userId: string) => {
  return await prisma.plant.findFirst({
    where: { 
      id: plantId,
      order: { userId }
    },
  });
};
