import { OrderStatus } from "@prisma/client";
import prisma from "../lib/prisma";

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

export const getUserOrders = async (userId: string) => {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      produce: true,
      rentalSpace: true,
      vendor: true,
    },
    orderBy: { orderDate: "desc" },
  });
};

export const getVendorOrders = async (vendorId: string) => {
  return await prisma.order.findMany({
    where: { vendorId },
    include: {
      user: {
        select: { name: true, email: true }
      },
      produce: true,
      rentalSpace: true,
    },
    orderBy: { orderDate: "desc" },
  });
};

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
