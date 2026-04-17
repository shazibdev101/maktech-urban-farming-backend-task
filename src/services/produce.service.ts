import prisma from "../lib/prisma";

/**
 * Creates a new produce listing for a vendor.
 * @param vendorId - ID of the vendor creating the listing.
 * @param produceData - Object containing product details.
 */
export const createProduce = async (vendorId: string, produceData: any) => {
  return await prisma.produce.create({
    data: {
      ...produceData,
      vendorId,
    },
  });
};

/**
 * Retrieves all produce listings with complex filtering and pagination.
 * @param filters - Object containing category, price range, search term, and pagination params.
 */
export const getAllProduce = async (filters: any) => {
  const { category, minPrice, maxPrice, search, page = 1, limit = 10 } = filters;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);
  
  const [data, total] = await Promise.all([
    prisma.produce.findMany({
      where: {
        AND: [
          category ? { category } : {},
          minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
          maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
          search ? { name: { contains: search, mode: "insensitive" } } : {},
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
      skip,
      take,
    }),
    prisma.produce.count({
      where: {
        AND: [
          category ? { category } : {},
          minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
          maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
          search ? { name: { contains: search, mode: "insensitive" } } : {},
        ],
      },
    }),
  ]);

  return { data, total, page: Number(page), limit: Number(limit) };
};

/**
 * Retrieves a single produce listing by ID.
 * @param id - Produce ID.
 */
export const getProduceById = async (id: string) => {
  return await prisma.produce.findUnique({
    where: { id },
    include: {
      vendor: true,
    },
  });
};

/**
 * Updates an existing produce listing.
 * @param id - Produce ID.
 * @param vendorId - ID of the vendor owning the listing.
 * @param updateData - Object containing fields to update.
 */
export const updateProduce = async (id: string, vendorId: string, updateData: any) => {
  const produce = await prisma.produce.findFirst({
    where: { id, vendorId },
  });

  if (!produce) {
    throw new Error("Product not found or unauthorized");
  }

  return await prisma.produce.update({
    where: { id },
    data: updateData,
  });
};

/**
 * Deletes a produce listing.
 * @param id - Produce ID.
 * @param vendorId - ID of the vendor owning the listing.
 */
export const deleteProduce = async (id: string, vendorId: string) => {
  const produce = await prisma.produce.findFirst({
    where: { id, vendorId },
  });

  if (!produce) {
    throw new Error("Product not found or unauthorized");
  }

  return await prisma.produce.delete({
    where: { id },
  });
};
