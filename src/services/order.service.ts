import { OrderStatus } from "@prisma/client";
import prisma from "../lib/prisma";

/**
 * Creates a new order for produce or a booking for a rental space.
 * Automatically validates availability and updates rental space status.
 * @param userId - ID of the customer placing the order.
 * @param orderData - Object containing produceId, rentalSpaceId, and vendorId.
 */
export const createOrder = async (userId: string, orderData: any) => {
  const { produceId, rentalSpaceId, vendorId } = orderData;

  // Validation: Must have either produce or rental space
  if (!produceId && !rentalSpaceId) {
    throw new Error("Order must contain either a product or a rental space");
  }

  // If produce, check availability
  if (produceId) {
    const produce = await prisma.produce.findUnique({ where: { id: produceId } });
    if (!produce || produce.availableQuantity <= 0) {
      throw new Error("Product not available");
    }
  }

  // If rental space, check availability
  if (rentalSpaceId) {
    const space = await prisma.rentalSpace.findUnique({ where: { id: rentalSpaceId } });
    if (!space || !space.availability) {
      throw new Error("Rental space not available");
    }
    
    // Update space availability to false upon booking
    await prisma.rentalSpace.update({
      where: { id: rentalSpaceId },
      data: { availability: false }
    });
  }

  return await prisma.order.create({
    data: {
      userId,
      vendorId,
      produceId: produceId || null,
      rentalSpaceId: rentalSpaceId || null,
      status: "PENDING" as OrderStatus,
    },
  });
};

/**
 * Retrieves all orders for a specific customer with pagination.
 * @param userId - ID of the customer.
 * @param filters - Pagination parameters (page, limit).
 */
export const getUserOrders = async (userId: string, filters: any = {}) => {
  const { page = 1, limit = 10 } = filters;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const [data, total] = await Promise.all([
    prisma.order.findMany({
      where: { userId },
      include: {
        produce: true,
        rentalSpace: true,
        vendor: true,
      },
      orderBy: { orderDate: "desc" },
      skip,
      take,
    }),
    prisma.order.count({ where: { userId } }),
  ]);

  return { data, total, page: Number(page), limit: Number(limit) };
};

/**
 * Retrieves all orders received by a specific vendor with pagination.
 * @param vendorId - ID of the vendor profile.
 * @param filters - Pagination parameters (page, limit).
 */
export const getVendorOrders = async (vendorId: string, filters: any = {}) => {
  const { page = 1, limit = 10 } = filters;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const [data, total] = await Promise.all([
    prisma.order.findMany({
      where: { vendorId },
      include: {
        user: {
          select: { name: true, email: true }
        },
        produce: true,
        rentalSpace: true,
      },
      orderBy: { orderDate: "desc" },
      skip,
      take,
    }),
    prisma.order.count({ where: { vendorId } }),
  ]);

  return { data, total, page: Number(page), limit: Number(limit) };
};

/**
 * Updates the status of an existing order (e.g., PENDING to DELIVERED).
 * @param orderId - ID of the order.
 * @param vendorId - ID of the vendor owning the order.
 * @param status - Target status (OrderStatus enum).
 */
export const updateOrderStatus = async (orderId: string, vendorId: string, status: any) => {
  const order = await prisma.order.findFirst({
    where: { id: orderId, vendorId },
  });

  if (!order) {
    throw new Error("Order not found or unauthorized");
  }

  return await prisma.order.update({
    where: { id: orderId },
    data: { status: status as OrderStatus },
  });
};
