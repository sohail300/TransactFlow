import { z } from "zod";

export const transactionSchema = z.object({
  type: z.string().min(1, "Type is required"), // Transaction type, can only be "Expense" or "Revenue"
  amount: z.number().min(0.01, "Amount must be greater than zero"), // Amount must be a positive number
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description can't exceed 500 characters"),
});

export type Transaction = z.infer<typeof transactionSchema>;
