import { z } from "zod";

export const roleUpdateSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
  newRole: z.enum(["Employee", "Manager", "Admin"], {
    message: "Invalid role",
  }),
});

export type RoleUpdate = z.infer<typeof roleUpdateSchema>;
