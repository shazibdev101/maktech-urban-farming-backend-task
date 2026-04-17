import prisma from "../lib/prisma";

export const createSpace = async (vendorId: string, spaceData: any) => {
  return await prisma.rentalSpace.create({
    data: {
      ...spaceData,
      vendorId,
    },
  });
};

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

export const getSpaceById = async (id: string) => {
  return await prisma.rentalSpace.findUnique({
    where: { id },
    include: {
      vendor: true,
    },
  });
};

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
