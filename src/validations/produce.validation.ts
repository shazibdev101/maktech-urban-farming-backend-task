import { z } from "zod";

export const createProduceSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Product name must be at least 3 characters"),
    description: z.string().optional(),
    price: z.number().positive("Price must be a positive number"),
    category: z.string().min(1, "Category is required"),
    availableQuantity: z.number().int().nonnegative("Quantity cannot be negative"),
  }),
});
