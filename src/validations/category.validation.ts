import { z } from "zod";

export const categoryValidation = z.object({
  name: z.string().trim().min(3, {
    message: "Le nom doit contenir au moins 3 caractères",
  }),
});
