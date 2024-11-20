import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
});

// Append 'Schema' to indicate this type is derived from Zod
export type UserSchemaType = z.infer<typeof UserSchema>;
