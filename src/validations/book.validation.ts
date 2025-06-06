import { z } from "zod";

export const bookValidation = z.object({
  title: z.string().trim().min(3, {
    message: "Le titre doit contenir au moins 3 caractères",
  }),
  author: z.string().trim().min(3, {
    message: "L'auteur doit contenir au moins 3 caractères",
  }),
  category_id: z.string().trim().min(3, {
    message: "La catégorie doit contenir au moins 3 caractères",
  }),
});
