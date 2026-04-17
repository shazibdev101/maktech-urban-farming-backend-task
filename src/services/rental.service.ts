import prisma from "../lib/prisma";

/**
 * Creates a new garden rental space listing for a vendor.
 * @param vendorId - ID of the vendor creating the listing.
 * @param spaceData - Object containing location, size, and price.
 */
export const createSpace = async (vendorId: string, spaceData: any) => {
  return await prisma.rentalSpace.create({
    data: {
      ...spaceData,
      vendorId,
    },
  });
};

/**
 * Retrieves all available garden rental spaces with location and price filtering.
 * @param filters - Object containing location search term and price range.
 */
export const getSpaces = async (filters: any) => {
  const { location, minPrice, maxPrice } = filters;
  
  return await prisma.rentalSpace.findMany({
    where: {
      AND: [
        location ? { location: { contains: location, mode: "insensitive" } } : {},
        minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
        maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
        { availability: true }, // Only show available spaces
      ],
    },
    include: {
      vendor: {
        select: {
          farmName: true,
          farmLocation: true,
        },
      },
    },
  });
};

/**
 * Retrieves a single garden rental space by ID.
 * @param id - Space ID.
 */
export const getSpaceById = async (id: string) => {
  return await prisma.rentalSpace.findUnique({
    where: { id },
    include: {
      vendor: true,
    },
  });
};

/**
 * Updates an existing garden rental space listing.
 * @param id - Space ID.
 * @param vendorId - ID of the vendor owning the listing.
 * @param updateData - Object containing fields to update.
 */
export const updateSpace = async (id: string, vendorId: string, updateData: any) => {
  const space = await prisma.rentalSpace.findFirst({
    where: { id, vendorId },
  });

  if (!space) {
    throw new Error("Rental space not found or unauthorized");
  }

  return await prisma.rentalSpace.update({
    where: { id },
    data: updateData,
  });
};

/**
 * Deletes a garden rental space listing.
 * @param id - Space ID.
 * @param vendorId - ID of the vendor owning the listing.
 */
export const deleteSpace = async (id: string, vendorId: string) => {
  const space = await prisma.rentalSpace.findFirst({
    where: { id, vendorId },
  });

  if (!space) {
    throw new Error("Rental space not found or unauthorized");
  }

  return await prisma.rentalSpace.delete({
    where: { id },
  });
};
